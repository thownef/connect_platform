"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Wrapper from "../../../atomic-component/Wrapper/index";
import { Locale } from "@/util/constanst";
import { RootState } from "@/store/reducer";
import { checkNull, createMarkup } from "@/helper";
import "./index.scss";
import { CompanyDescription } from "@/store/profile/type";
import Edit from "./Modal/Edit";

const Introduce = ({
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
  const companyIntroduce: CompanyDescription[] = useSelector(
    (state: RootState) => state.profile.company_description
  );
  const [edit, setEdit] = useState(false);
  return (
    <div>
      <Wrapper>
        <Row
          justify={"center"}
          style={{ marginBottom: "20px" }}
          align={"middle"}
        >
          <Col span={24}>
            <h1 className="h1_title">{dictionary["INTRODUCTION"]}</h1>
            <div className="feature_center">
              <hr />
              <div className="oth-sub-header-home">
                {dictionary["Brief introduction of the company"]}
              </div>
              <hr />
            </div>
          </Col>
        </Row>

        {isUser && isUpdated && (
          <Row justify={"end"}>
            <div className="feature_content_btn">
              <button
                className="content_btn_edit"
                onClick={() => setEdit(true)}
              >
                <EditOutlined className="icon_edit" />
                &nbsp; {dictionary["Edit"]}
              </button>
            </div>
          </Row>
        )}

        {companyIntroduce?.map((item) => (
          <div
            dangerouslySetInnerHTML={createMarkup(
              checkNull(
                lang === "vi"
                  ? item.description
                  : lang === "en"
                  ? item.descriptionEN
                  : item.descriptionJP
              )
            )}
            key={item.id}
          />
        ))}
      </Wrapper>
      <Edit
        dictionary={dictionary}
        isOpen={edit}
        setOpen={setEdit}
        id={id}
        success={success}
        error={error}
      />
    </div>
  );
};

export default Introduce;
