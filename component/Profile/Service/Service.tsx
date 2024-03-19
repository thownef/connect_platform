import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Col, Popconfirm, Row, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Locale, STATUS_CODE } from "@/util/constanst";
import "./index.scss";
import Wrapper from "@/atomic-component/Wrapper";
import { RootState } from "@/store/reducer";
import { CompanyFeature } from "@/store/profile/type";
import defaultImageUrl from "../../../public/images/logobanner.png";
import ModalFeature from "./Modal/ModalFeature";
import { endLoading, startLoading } from "@/store/loading/action";
import { deleteCompanyFeature } from "@/store/callApi";
import { getProfileCompany } from "@/store/profile/action";

const Service = ({
  lang,
  dictionary,
  isUser,
  success,
  error,
  isUpdated
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
  isUser: boolean;
  success: (message: string) => void;
  error: (message: string) => void;
  isUpdated: boolean;
}) => {
  const { slug } = useParams();
  const companyFeature: CompanyFeature[] = useSelector(
    (state: RootState) => state.profile.company_specialties
  );
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [idEdit, setIdEdit] = useState<string | number>(0);

  const handleOpen = (id: string | number) => {
    setOpen(true);
    setIdEdit(id);
  };

  const confirm = async (id: string | number) => {
    dispatch(startLoading());
    const res = await deleteCompanyFeature(id);
    if (res?.status === STATUS_CODE.SUCCESS) {
      message.success("Deleted");
      dispatch(getProfileCompany(Number(slug)));
      dispatch(endLoading());
    } else {
      message.error("Delete Failed");
      dispatch(endLoading());
    }
  };
  return (
    <>
      <Wrapper>
        <Row justify={"center"} style={{ marginBottom: "20px" }}>
          <Col span={24}>
            <h1 className="h1_title">{dictionary["COMPANY FEATURES"]}</h1>
          </Col>
        </Row>

        {isUser && isUpdated && (
          <Row justify={"center"}>
            <div className="feature_content_btn">
              <button
                className="content_btn_edit"
                onClick={() => handleOpen(0)}
              >
                <PlusOutlined className="icon_edit" /> {dictionary["Create"]}
              </button>
            </div>
          </Row>
        )}

        <div className="container_feature">
          {companyFeature?.map((item) => (
            <div key={item.id} className="container_feature_content">
              {isUser && isUpdated && (
                <Row justify={"center"}>
                  <div className="feature_content_btn">
                    <button
                      className="content_btn_edit"
                      onClick={() => handleOpen(item.id)}
                    >
                      <EditOutlined className="icon_edit" />{" "}
                      {dictionary["Edit"]}
                    </button>
                    <Popconfirm
                      title="Delete"
                      description="Are you sure to delete company feature?"
                      onConfirm={() => confirm(item.id)}
                    >
                      <button className="content_btn_delete">
                        <DeleteOutlined />
                        {dictionary["Delete"]}
                      </button>
                    </Popconfirm>
                  </div>
                </Row>
              )}
              <div className="feature_content_image">
                <div className="container_feature_content_image">
                  {item.speciality_picture ? (
                    <img src={item.speciality_picture} alt="imaged"></img>
                  ) : (
                    <Image src={defaultImageUrl} alt="imaged" />
                  )}
                </div>
              </div>
              <div className="container_feature_content_item">
                {lang === "vi" ? (
                  <span>{item.speciality_desc}</span>
                ) : lang === "ja" ? (
                  <span>{item.speciality_desc_jp}</span>
                ) : (
                  <span>{item.speciality_desc_en}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
      <ModalFeature
        dictionary={dictionary}
        isOpen={open}
        setOpen={setOpen}
        id={idEdit}
        setEdit={setIdEdit}
        success={success}
        error={error}
      />
    </>
  );
};

export default Service;
