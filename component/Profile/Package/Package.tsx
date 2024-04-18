import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Col, Popconfirm, Row, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Wrapper from "@/atomic-component/Wrapper";
import defaultImageUrl from "../../../public/images/background.jpg";
import { checkNull, createMarkup } from "@/helper";
import { Locale, STATUS_CODE } from "@/util/constanst";
import { RootState } from "@/store/reducer";
import { CompanyProduct } from "@/store/profile/type";
import "./index.scss";
import ModalPackage from "./Modal/ModalPackage";
import { deleteCompanyProduct } from "@/store/callApi";
import { getProfileCompany } from "@/store/profile/action";
import { endLoading, startLoading } from "@/store/loading/action";

const Package = ({
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
  const dispatch = useDispatch();
  const companyProduct: CompanyProduct[] = useSelector(
    (state: RootState) => state.profile.company_products
  );

  const [open, setOpen] = useState(false);
  const [idEdit, setIdEdit] = useState<string | number>("");

  const handleOpen = (id: string | number) => {
    setOpen(true);
    setIdEdit(id);
  };

  const confirm = async (id: string | number) => {
    dispatch(startLoading());
    const res = await deleteCompanyProduct(id);
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
            <h1 className="h1_title">{dictionary["MAIN SERVICES"]}</h1>
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

        <div className="product-container">
          {companyProduct?.map((item) => (
            <div key={item.id} className="product-card">
              <Row justify={"center"}>
                {isUser && isUpdated && (
                  <div className="feature_content_btn">
                    <button
                      className="content_btn_edit"
                      onClick={() => handleOpen(item.id)}
                    >
                      <EditOutlined className="icon_edit" /> {dictionary["Edit"]}
                    </button>
                    <Popconfirm
                      title="Delete"
                      description="Are you sure to delete company feature?"
                      okText="Yes"
                      onConfirm={() => confirm(item.id)}
                    >
                      <button className="content_btn_delete">
                        <DeleteOutlined /> {dictionary["Delete"]}
                      </button>
                    </Popconfirm>
                  </div>
                )}
              </Row>
              <div className="card-service-center">
                <div className="card-service">
                  {item.product_picture ? (
                    <img
                      alt="example"
                      src={item.product_picture}
                      className="card-service-image"
                    />
                  ) : (
                    <Image
                      src={defaultImageUrl}
                      alt="imaged"
                      className="card-service-image"
                    />
                  )}
                </div>
              </div>
              <div className="content">
                <h3>{checkNull(item.product_name)}</h3>
                <div className="more_content">
                  <p
                    dangerouslySetInnerHTML={createMarkup(
                      checkNull(
                        lang === "vi"
                          ? item.product_description
                          : lang === "en"
                          ? item.product_description_EN
                          : item.product_description_JP
                      )
                    )}
                  ></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
      <ModalPackage
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

export default Package;
