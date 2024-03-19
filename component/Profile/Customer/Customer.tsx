import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Col, Popconfirm, Row, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Locale, STATUS_CODE } from "@/util/constanst";
import "./index.scss";
import Wrapper from "@/atomic-component/Wrapper";
import { RootState } from "@/store/reducer";
import { CompanyCustomer } from "@/store/profile/type";
import { checkNull } from "@/helper";
import defaultImageUrl from "../../../public/images/logobanner.png";
import ModalCustomer from "./Modal/ModalCustomer";
import { endLoading, startLoading } from "@/store/loading/action";
import { deleteCompanyCustomer } from "@/store/callApi";
import { getProfileCompany } from "@/store/profile/action";

const Customer = ({
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
  const companyCustomer: CompanyCustomer[] = useSelector(
    (state: RootState) => state.profile.company_main_clients
  );
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [open, setOpen] = useState(false);
  const [idEdit, setIdEdit] = useState<string | number>(0);

  const handleOpen = (id: string | number) => {
    setOpen(true);
    setIdEdit(id);
  };

  const confirm = async (id: string | number) => {
    dispatch(startLoading());
    const res = await deleteCompanyCustomer(id);
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
        <Row justify="center" style={{ marginBottom: "20px" }}>
          <Col span={24}>
            <h1 className="h1_title">{dictionary["CUSTOMERS"]}</h1>
          </Col>
        </Row>
        {isUser && isUpdated && (
          <Row justify="center">
            <div className="feature_content_btn">
              <button
                onClick={() => handleOpen(0)}
                className="content_btn_edit"
              >
                <PlusOutlined className="icon_edit" /> {dictionary["Create"]}
              </button>
            </div>
          </Row>
        )}
        <Row justify="center" gutter={[16, 16]} style={{ marginTop: "20px" }}>
          {companyCustomer?.map((item) => (
            <Col
              xl={4}
              lg={6}
              md={6}
              sm={12}
              xs={24}
              className="container"
              key={item.id}
              style={{ textAlign: "center", alignItems: "center" }}
            >
              {item.client_name && (
                <>
                  {isUser && isUpdated && (
                    <Row justify="center">
                      <Col>
                        <button
                          onClick={() => handleOpen(item.id)}
                          className="content_btn_edit"
                        >
                          <EditOutlined className="icon_edit" />
                          {dictionary["Edit"]}
                        </button>
                      </Col>
                      <Col>
                        <Popconfirm
                          title="Delete"
                          description="Are you sure to delete customer?"
                          okText="Yes"
                          onConfirm={() => confirm(item.id)}
                        >
                          <button className="content_btn_edit">
                            <DeleteOutlined className="icon_edit" />
                            {dictionary["Delete"]}
                          </button>
                        </Popconfirm>
                      </Col>
                    </Row>
                  )}
                  <Row justify="center">
                    <Link href={item.client_url} target="_blank">
                      <Image
                        className="logo"
                        src={item.client_logo || defaultImageUrl}
                        alt=""
                        width={100}
                        height={50}
                      />
                      <p style={{ color: "#212529" }}>
                        {checkNull(item.client_name)}
                      </p>
                    </Link>
                  </Row>
                </>
              )}
            </Col>
          ))}
        </Row>
      </Wrapper>

      <ModalCustomer
        isOpen={open}
        setOpen={setOpen}
        id={idEdit}
        setEdit={setIdEdit}
        success={success}
        error={error}
        dictionary={dictionary}
      />
    </>
  );
};

export default Customer;
