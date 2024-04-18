"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { Col, Row, message } from "antd";
import { useFormik } from "formik";
import { Locale, STATUS_CODE } from "@/util/constanst";
import "./index.scss";
import { initData } from "./constant";
import { updateInfoSchema } from "./validation";
import Info from "./Info/Info";
import { createNewProfile } from "@/store/callApi";
const Introduce = dynamic(() => import("./Introduce/Introduce"), {
  ssr: false,
});
const Package = dynamic(() => import("./Package/Package"), {
  ssr: false,
});
import Service from "./Service/Service";
import Team from "./Team/Team";
import Customer from "./Customer/Customer";
import { CurrentUser } from "@/store/login/type";
import { RootState } from "@/store/reducer";
import { upload } from "@/helper";
import { endLoading, startLoading } from "@/store/loading/action";
import { useRouter } from "next/navigation";

const CreateProfilePage = ({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user: CurrentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  );
  const [messageApi, contextHolder] = message.useMessage();

  const success = (message: string) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const handleSubmit = async (values: any) => {
    try {
      dispatch(startLoading());
      let newData = { ...values };
      if (!!newData.info[0].company_logo) {
        const imgUrl = await upload(newData.info[0].company_logo, user.id);
        newData.info[0].company_logo = imgUrl;
      }

      for (let i = 0; i < newData.products.length; i++) {
        if (!!newData.products[i].product_picture) {
          const imgUrl = await upload(
            newData.products[i].product_picture,
            user.id
          );
          newData.products[i].product_picture = imgUrl;
        }
      }

      for (let i = 0; i < newData.specialities.length; i++) {
        if (!!newData.specialities[i].speciality_picture) {
          const imgUrl = await upload(
            newData.specialities[i].speciality_picture,
            user.id
          );
          newData.specialities[i].speciality_picture = imgUrl;
        }
      }

      for (let i = 0; i < newData.members.length; i++) {
        if (!!newData.members[i].member_picture) {
          const imgUrl = await upload(
            newData.members[i].member_picture,
            user.id
          );
          newData.members[i].member_picture = imgUrl;
        }
      }

      for (let i = 0; i < newData.clients.length; i++) {
        if (!!newData.clients[i].client_logo) {
          const imgUrl = await upload(newData.clients[i].client_logo, user.id);
          newData.clients[i].client_logo = imgUrl;
        }
      }
      const res = await createNewProfile(values);
      if (res?.status === STATUS_CODE.SUCCESS) {
        success(res.data.message);
        router.push(`/${lang}`);
      }
    } finally {
      dispatch(endLoading());
    }
  };

  const formikBag = useFormik({
    initialValues: initData,
    validationSchema: updateInfoSchema,
    onSubmit: async (values: any) => handleSubmit(values),
  });

  useEffect(() => {
    formikBag.setFieldValue("info[0].email", user.email);
    formikBag.setFieldValue("info[0].user_id", user.id);
  }, [user.email, user.id]);

  return (
    <>
      {contextHolder}
      <form onSubmit={formikBag.handleSubmit} className="member__wrapper">
        <div className="member__container">
          <Row className="member__title" justify={"center"} align={"middle"}>
            <Col span={24}>
              <h2 style={{ marginTop: 8 }}>{dictionary["PROFILE"]}</h2>
            </Col>
            <Col span={24} className="member__title_required">
              * <span>{dictionary["Required"]}</span>
            </Col>
          </Row>
          <Info lang={lang} dictionary={dictionary} formikBag={formikBag} />
          <Introduce dictionary={dictionary} formikBag={formikBag} />
          <Package dictionary={dictionary} formikBag={formikBag} />
          <Service dictionary={dictionary} formikBag={formikBag} />
          <Team dictionary={dictionary} formikBag={formikBag} />
          <Customer dictionary={dictionary} formikBag={formikBag} />
          <Col span={24}>
            <div className="center">
              <button
                type="submit"
                onClick={() => {
                  formikBag.validateForm().then((errors) => {
                    if (Object.keys(errors).length > 0) {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }
                  });
                }}
              >
                {dictionary["Create Profile"]}
              </button>
            </div>
          </Col>
        </div>
      </form>
    </>
  );
};

export default CreateProfilePage;
