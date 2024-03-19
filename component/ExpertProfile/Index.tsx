"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Row } from "antd";
import { Locale, STATUS_CODE } from "@/util/constanst";
import "./index.scss";
import logo1 from "../../public/images/logo1.png";
import logo2 from "../../public/images/logo2.png";
import logo3 from "../../public/images/logo3.png";
import logo4 from "../../public/images/logo4.png";
import { Expert } from "../ListExpert/constant";
import { endLoading, startLoading } from "@/store/loading/action";
import { getExpertByID } from "@/store/callApi";
import { checkNull, createMarkup } from "@/helper";
import ContactForm from "@/atomic-component/ContactForm/Index";

const ExpertProfile = ({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
}) => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [data, setData] = useState<Expert>();

  const getData = async (id: string | number) => {
    try {
      dispatch(startLoading());
      const res = await getExpertByID(id);
      if (res?.status === STATUS_CODE.SUCCESS) {
        setData(res.data.data);
      }
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    getData(Number(slug));
  }, [slug]);
  return (
    <div className="detail-expert">
      <div className="detail-content-expert">
        <div className="content-expert-title">
          <h2 className="title-class-expert">
            {dictionary["Introducing business consultants"]}
          </h2>
        </div>
        {data && (
          <div className="content-expert-title">
            <div className="content-expert-detail">
              <div className="content-expert-detail-image">
                <div className="expertImage">
                  <img src={data.image} alt="avt" />
                </div>
                <h3>
                  <b>
                    {lang === "vi"
                      ? data.user_name
                      : lang === "en"
                      ? data.user_name_en
                      : data.user_name_jp}
                  </b>
                </h3>
                <div className="content-expert-detail-special">
                  <span>
                    {lang === "vi"
                      ? data.specialize_vn
                      : lang === "en"
                      ? data.specialize_en
                      : data.specialize_jp}
                  </span>
                </div>
                <Row className="flag" justify={"center"}>
                  <Image src={logo1} alt="" />

                  {data &&
                    data.langues &&
                    Array.isArray(data.langues) &&
                    data.langues.length > 0 &&
                    data.langues.map((item: any) =>
                      item === "Japanese" ? (
                        <Image src={logo4} alt="" key={item} />
                      ) : item === "Vietnamese" ? (
                        <Image src={logo2} alt="" key={item} />
                      ) : (
                        <Image src={logo3} alt="" key={item} />
                      )
                    )}
                </Row>
                <h3 className="content-expert-detail-image__h3">
                  {dictionary["Education"]}
                </h3>
                <span
                  className="content-expert-detail-education"
                  dangerouslySetInnerHTML={createMarkup(
                    checkNull(
                      lang === "vi"
                        ? data.education_vn
                        : lang === "en"
                        ? data.education_en
                        : data.education_jp
                    )
                  )}
                ></span>
              </div>
              <div className="content-expert-detail-content">
                <h3>{dictionary["Experience"]}</h3>
                <span
                  dangerouslySetInnerHTML={createMarkup(
                    checkNull(
                      lang === "vi"
                        ? data.experience_vn
                        : lang === "en"
                        ? data.experience_en
                        : data.experience_jp
                    )
                  )}
                />
              </div>
            </div>
          </div>
        )}
        <ContactForm
          lang={lang}
          dictionary={dictionary}
          page="expert"
          emailExpert={data?.email}
          nameExpert={data?.user_name}
        />
      </div>
    </div>
  );
};

export default ExpertProfile;
