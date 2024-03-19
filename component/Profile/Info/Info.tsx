import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { Col, Row } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { CompanyInfo } from "@/store/profile/type";
import { RootState } from "@/store/reducer";
import { Locale } from "@/util/constanst";
import logo1 from "../../../public/images/logo1.png";
import logo2 from "../../../public/images/logo2.png";
import logo3 from "../../../public/images/logo3.png";
import logo4 from "../../../public/images/logo4.png";
import "./index.scss";
import Edit from "./Modal/Edit";
import { useNeed } from "@/helper";

const Info = ({
  lang,
  dictionary,
  isUser,
  id,
  success,
  error,
  isUpdated,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
  isUser: boolean;
  id: string | number;
  success: (message: string) => void;
  error: (message: string) => void;
  isUpdated: boolean;
}) => {
  const [edit, setEdit] = useState(false);
  const company_info: CompanyInfo[] = useSelector(
    (state: RootState) => state.profile.company_info
  );

  return (
    <>
      <div className="profile__container">
        <Row justify="space-between">
          <Col sm={8} xs={24}>
            <div className="profile__container_banner">
              <img
                className="banner"
                src={company_info[0]?.company_logo}
                alt=""
              />
            </div>
          </Col>
        </Row>
        <Row className="content">
          {isUser && isUpdated && (
            <Col span={24} className="content_company_item">
              <div className="feature_content_btn">
                <button
                  className="content_btn_edit"
                  onClick={() => setEdit(true)}
                >
                  <EditOutlined className="icon_edit" />
                  &nbsp; {dictionary["Edit"]}
                </button>
              </div>
            </Col>
          )}
          <Col span={24}>
            <Row align="middle" className="content__item_titile">
              <h3>
                {lang === "vi"
                  ? company_info[0]?.company_name
                  : lang === "en"
                  ? company_info[0]?.company_name_en
                  : company_info[0]?.company_name_jp}
              </h3>
            </Row>
          </Col>
          <Col span={14} xs={24} sm={12}>
            <Row>
              <Col xl={12} xs={24}>
                <Row align="middle" className="content__item">
                  <span>{dictionary["Establishment"]}:</span>
                  <p>
                    {company_info[0]?.estalishment
                      ? company_info[0]?.estalishment
                      : dictionary["Updating"]}
                  </p>
                </Row>
              </Col>
              <Col xl={12} xs={24}>
                <Row align="middle" className="content__item">
                  <span>{dictionary["Employers"]}: </span>
                  <p>
                    {company_info[0]?.employers
                      ? company_info[0]?.employers
                      : dictionary["Updating"]}
                  </p>
                </Row>
              </Col>
            </Row>
            <Row align="middle" className="content__item">
              <span>{dictionary["Capital"]}: </span>
              <p>
                {company_info[0]?.capital
                  ? company_info[0]?.capital
                  : dictionary["Updating"]}
              </p>
            </Row>
          </Col>
          <Col span={10} xs={24} sm={12} className="colcategory">
            <div className="category content__item">
              <span>{dictionary["Category"]}: </span>
              {lang === "vi"
                ? company_info[0]?.category_vn
                  ? company_info[0]?.category_vn
                  : dictionary["Updating"]
                : lang === "en"
                ? company_info[0]?.category_en
                  ? company_info[0]?.category_en
                  : dictionary["Updating"]
                : company_info[0]?.category_jp
                ? company_info[0]?.category_jp
                : dictionary["Updating"]}
            </div>
            <div className="customer content__item">
              <span>{dictionary["Needs"]}: </span>
              {!!useNeed(lang, company_info[0])
                ? useNeed(lang, company_info[0])
                : dictionary["Updating"]}
            </div>
          </Col>
          <Col span={24}>
            <p className="addresss">
              {lang === "vi"
                ? company_info[0]?.address_vn
                  ? company_info[0]?.address_vn
                  : dictionary["Updating"]
                : lang === "en"
                ? company_info[0]?.address_en
                  ? company_info[0]?.address_en
                  : dictionary["Updating"]
                : company_info[0]?.address_jp
                ? company_info[0]?.address_jp
                : dictionary["Updating"]}
            </p>
            <Row className="flag">
              <Image src={logo1} alt="" />
              {company_info && company_info.length > 0 && (
                <>
                  {company_info[0]?.country === "Viet Nam" ? (
                    <>
                      {company_info[0]?.languages.includes("vietnam") && (
                        <Image src={logo2} alt="" />
                      )}
                      {company_info[0]?.languages.includes("japan") && (
                        <Image src={logo4} alt="" />
                      )}
                      {company_info[0]?.languages.includes("english") && (
                        <Image src={logo3} alt="" />
                      )}
                    </>
                  ) : (
                    <>
                      {company_info[0]?.languages.includes("japan") && (
                        <Image src={logo4} alt="" />
                      )}
                      {company_info[0]?.languages.includes("vietnam") && (
                        <Image src={logo2} alt="" />
                      )}
                      {company_info[0]?.languages.includes("english") && (
                        <Image src={logo3} alt="" />
                      )}
                    </>
                  )}
                </>
              )}
            </Row>
          </Col>
        </Row>
      </div>

      <Edit
        isOpen={edit}
        setOpen={setEdit}
        id={id}
        lang={lang}
        success={success}
        error={error}
        dictionary={dictionary}
      />
    </>
  );
};

export default Info;
