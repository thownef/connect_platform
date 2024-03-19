"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Col, Row } from "antd";
import { CaretRightOutlined, CaretLeftOutlined, DoubleLeftOutlined } from "@ant-design/icons";
import { Locale, STATUS_CODE } from "@/util/constanst";
import "./index.scss";
import { getExpertClient } from "@/store/callApi";
import { endLoading, startLoading } from "@/store/loading/action";
import { Expert } from "./constant";
import ImageDefault from '../../public/images/data-not-found.png';

const ListExpert = ({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
}) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState<Expert[]>([]);
  const [keyword, setKeyword] = useState<string>(search || "");
  const [keyword1, setKeyword1] = useState<string>(search || "");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getData(keyword);
    setKeyword1(keyword);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("search", keyword);
    router.push(pathname + "?" + newSearchParams.toString());
  };

  const handleReset = () =>{
	getData("");
	setKeyword("")
    setKeyword1("");
    router.push(pathname);
  }

  const handleClick = (id: string | number) => {
    router.push(`/${lang}/expert/${id}`);
  };

  const getData = async (keyword: string) => {
    dispatch(startLoading());
    try {
      const res = await getExpertClient(keyword);
      if (res?.status === STATUS_CODE.SUCCESS) {
        setData(res.data.data);
      }
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    getData(keyword);
  }, []);

  return (
    <div className="">
      <div className="search-input-expert">
        <div className="search-input-expert-item">
          <form onSubmit={handleSearch}>
            <Row align={"middle"}>
              <Col span={18}>
                <input
                  onChange={(e) => setKeyword(e.target.value)}
				          value={keyword}
                  type="text"
                  placeholder={dictionary['Search'] + " ..."}
                />
              </Col>
              <Col span={6}>
                <button>{dictionary["Search"]}</button>
              </Col>
            </Row>
          </form>
          <div className="search-input-expert-title">
            <span>
              {dictionary["Result For"]}: {keyword1}
            </span>
          </div>
        </div>
      </div>
      <div className="galley">
        <div className="galley-expert">
		{data?.length > 0 ? (
  data.map((item) => (
    <div key={item.id} className="card-expert">
      <div className="content-expert-image">
        <img src={item.image} alt="home" width={180} height={180} />
      </div>
      <div className="content-expert-name">
        {lang === "vi" ? (
          <h3>{item.user_name}</h3>
        ) : lang === "ja" ? (
          <h3>{item.user_name_jp}</h3>
        ) : (
          <h3>{item.user_name_en}</h3>
        )}
      </div>
      <div className="content-expert-special">
        {lang === "vi" ? (
          <span>{item.specialize_vn}</span>
        ) : lang === "ja" ? (
          <span>{item.specialize_jp}</span>
        ) : (
          <span>{item.specialize_en}</span>
        )}
      </div>
      <div className="content-expert-eye">
        <div className="content-expert-show">
          <CaretLeftOutlined className="icon-expert" />
          <button onClick={() => handleClick(item.id)}>
            {dictionary["View profile"]}
          </button>
          <CaretRightOutlined className="icon-expert" />
        </div>
      </div>
    </div>
  ))
) : (
  <div className="search-not-found">
    <div className="search-not-found-item">
      <div>
        <Image src={ImageDefault} alt="logo" width={300} height={300} />
      </div>
      <span>{dictionary['Data not found']}</span>
      <div>
        <button onClick={handleReset} className="btn-search-not-found">
          <DoubleLeftOutlined className="icon-all-expert" />
          {dictionary['ALL']}
        </button>
      </div>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default ListExpert;
