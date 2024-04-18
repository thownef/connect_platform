import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Col, Popconfirm, Row, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Wrapper from "@/atomic-component/Wrapper";
import { CompanyCoreMember } from "@/store/profile/type";
import { RootState } from "@/store/reducer";
import { Locale, STATUS_CODE } from "@/util/constanst";
import "./index.scss";
import notFound from "../../../public/images/businessman.png";
import { checkNull, createMarkup } from "@/helper";
import ModalTeam from "./Modal/ModalTeam";
import { endLoading, startLoading } from "@/store/loading/action";
import { deleteCompanyCoreMember } from "@/store/callApi";
import { getProfileCompany } from "@/store/profile/action";

const Team = ({
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
  const companyCoreMember: CompanyCoreMember[] = useSelector(
    (state: RootState) => state.profile.company_core_members
  );
  const dispatch = useDispatch()
  const {slug} = useParams()
  const [open, setOpen] = useState(false);
  const [idEdit, setIdEdit] = useState<string | number>(0);

  const handleOpen = (id: string | number) => {
    setOpen(true);
    setIdEdit(id);
  };

  const confirm = async (id: string | number) => {
    dispatch(startLoading());
    const res = await deleteCompanyCoreMember(id);
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
            <h1 className="h1_title">{dictionary["CORE MEMBERS"]}</h1>
          </Col>
        </Row>
        {isUser && isUpdated && (
          <Row justify={"center"}>
            <div className="feature_content_btn">
              <button onClick={()=>handleOpen(0)} className="content_btn_edit">
                <PlusOutlined className="icon_edit" /> {dictionary["Create"]}
              </button>
            </div>
          </Row>
        )}

        <Row gutter={[16, 16]} justify={"center"} align={"stretch"}>
          {companyCoreMember?.map((item) => (
            <Col
              xxl={5}
              xl={6}
              lg={10}
              md={12}
              sm={16}
              className="team__container"
              key={item.id}
            >
              <div className="box">
                {isUser && isUpdated && (
                  <Row justify={"center"}>
                      <button onClick={()=>handleOpen(item.id)} className="content_btn_edit">
                        <EditOutlined className="icon_edit" /> {dictionary["Edit"]}
                      </button>
                      <Popconfirm
                        title="Delete"
                        description="Are you sure to delete company feature?"
                        onConfirm={()=>confirm(item.id)}
                      >
                        <button className="content_btn_delete">
                          <DeleteOutlined /> {dictionary["Delete"]}
                        </button>
                      </Popconfirm>
                  </Row>
                )}
                {item.member_picture === "" ||
                item.member_picture === "NULL" ? (
                  <Image src={notFound} alt="" height={200} width={280} />
                ) : (
                  <img
                    src={item.member_picture}
                    alt=""
                    style={{
                      width: "60%",
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                )}
                <div className="content">
                  <h3>{checkNull(item.member_name)}</h3>
                  {lang === "vi" ? (
                    <>
                      <h6
                        dangerouslySetInnerHTML={createMarkup(
                          checkNull(item.member_position)
                        )}
                      ></h6>
                      <div className="desc_active">
                        <h6
                          className="content_prop"
                          dangerouslySetInnerHTML={createMarkup(
                            checkNull(item.member_desc)
                          )}
                        ></h6>
                      </div>
                    </>
                  ) : lang === "ja" ? (
                    <>
                      <h6
                        dangerouslySetInnerHTML={createMarkup(
                          checkNull(item.member_position_JP)
                        )}
                      ></h6>
                      <div className="desc_active">
                        <h6
                          className="content_prop"
                          dangerouslySetInnerHTML={createMarkup(
                            checkNull(item.member_desc_JP)
                          )}
                        ></h6>
                      </div>
                    </>
                  ) : (
                    <>
                      <h6
                        dangerouslySetInnerHTML={createMarkup(
                          checkNull(item.member_position_EN)
                        )}
                      ></h6>
                      <div className="desc_active">
                        <h6
                          className="content_prop"
                          dangerouslySetInnerHTML={createMarkup(
                            checkNull(item.member_desc_EN)
                          )}
                        ></h6>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Wrapper>
      <ModalTeam
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

export default Team;
