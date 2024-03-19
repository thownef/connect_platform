"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Col, Radio, Row } from "antd";
import logoVN from "../../../public/images/logo2.png";
import logoJP from "../../../public/images/logo4.png";
import { Locale } from "@/util/constanst";
import { useRouter } from "next/navigation";

const Search = ({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
}) => {
  const router = useRouter();
  const [data, setData] = useState({ keyword: "", category: "Japan" });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(
      `/${lang}/search/?keyword=${data.keyword}&country=${data.category}&pages=1`
    );
  };

  useEffect(() => {
    if (lang === "vi") {
      setData({ ...data, category: "Japan" });
    } else {
      setData({ ...data, category: "Viet Nam" });
    }
  }, [lang]);
  return (
    <form onSubmit={handleSubmit}>
      <Row
        align={"middle"}
        justify={"center"}
        className="container-content-search"
      >
        <Col
          xl={12}
          lg={10}
          md={10}
          sm={24}
          xs={24}
          className="container-content-search__input"
        >
          <input
            onChange={handleChange}
            name="keyword"
            type="text"
            placeholder={"Search company" + "..."}
          />
        </Col>
        <Col
          xl={5}
          lg={6}
          md={8}
          sm={12}
          xs={24}
          className="container-content-search__country"
        >
          <Radio.Group
            onChange={handleChange}
            value={data.category}
            name="category"
          >
            <Radio value={"Viet Nam"}>
              <Image src={logoVN} alt="" />
            </Radio>
            <Radio value={"Japan"}>
              <Image src={logoJP} alt="" />
            </Radio>
          </Radio.Group>
        </Col>
        <Col
          xl={3}
          lg={4}
          md={5}
          sm={8}
          xs={24}
          className="container-content-search__country"
        >
          <button type="submit" className="btn-search">
            {dictionary["Search"]}
          </button>
        </Col>
      </Row>
    </form>
  );
};

export default Search;
