import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Row } from "antd";
import { useFormik } from "formik";
import "./index.scss";
import {
  ContactType,
  initContact,
  initContactExpert,
  initContactUser,
  titleContact,
  titleContactUser,
} from "./constant";
import {
  contactExpertSchema,
  contactSchema,
  contactUserSchema,
} from "./validation";
import { CurrentUser } from "@/store/login/type";
import { RootState } from "@/store/reducer";
import {
  sendContact,
  sendContactExpert,
  sendMailContact,
  sendMailContactExpert,
} from "@/store/callApi";
import { Locale, STATUS_CODE } from "@/util/constanst";
import ModalContact from "./Modal/ModalContact";
import { CompanyInfo } from "@/store/profile/type";

const ContactForm = ({
  lang,
  dictionary,
  page,
  emailExpert,
  nameExpert,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
  page: string;
  emailExpert?: string;
  nameExpert?: string;
}) => {
  const user: CurrentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  );
  const { id, email, company_name } = user;
  const { slug } = useParams();
  const login: boolean = useSelector((state: RootState) => state.auth.isLogin);
  const company_info: CompanyInfo[] = useSelector(
    (state: RootState) => state.profile.company_info
  );
  const [isOpen, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const handleReset = () => {
    formikBag.resetForm();
    formikBag.setErrors({});
    if(page === "contact"){
      let newValue = { ...initContact, email_contact: email, id_contact: id };
      formikBag.setValues(newValue);
    }
  };
  const handleSubmit = async (values: ContactType) => {
    if (page === "expert") {
      try {
        const res = await sendMailContactExpert(values);
        if (res?.status === STATUS_CODE.SUCCESS) {
          await sendContactExpert(values);
          setOpen(true);
        }
      } catch (error) {}
    } else {
      try {
        const res = await sendMailContact(values);
        if (res?.status === STATUS_CODE.SUCCESS) {
          await sendContact(values);
          setOpen(true);
        }
      } catch (error) {}
    }
  };

  const getInitialValues = (page: string): ContactType => {
    return page === "contact"
      ? initContact
      : page === "profile"
      ? initContactUser
      : initContactExpert;
  };

  const getInitialSchema = (page: string): any => {
    return page === "contact"
      ? contactSchema(dictionary)
      : page === "profile"
      ? contactUserSchema(dictionary)
      : contactExpertSchema(dictionary);
  };

  const formikBag: any = useFormik({
    initialValues: getInitialValues(page),
    validationSchema: getInitialSchema(page),
    onSubmit: (values: ContactType) => handleSubmit(values),
  });

  useEffect(() => {
    setIsLogin(login);
  }, [login]);

  useEffect(() => {
    if (page === "expert") {
      let newValue = {
        ...initContactExpert,
        email_contact: email,
        company_name: company_name,
        email: emailExpert,
        expert_name: nameExpert,
        company_id: id,
        expert_id: slug,
      };

      formikBag.setValues(newValue);
    }
  }, [page, id, slug, emailExpert, nameExpert]);

  useEffect(() => {
    if (page === "profile") {
      let newValue = {
        ...initContactUser,
        email_contact: email,
        company_contact: company_name,
        id_contact: id,
      };
      if (company_info.length > 0) {
        newValue = {
          ...newValue,
          email: company_info[0]?.email,
          company_name: company_info[0]?.company_name,
        };
      }
      formikBag.setValues(newValue);
    }
  }, [company_info, email, id, page]);

  useEffect(() => {
    if (page === "contact" && isLogin) {
      let newValue = { ...initContact, email_contact: email, id_contact: id };
      formikBag.setValues(newValue);
    }
  }, [isLogin, id, page]);

  return (
    <div className="landing__content__wrapper">
      <form onSubmit={formikBag.handleSubmit}>
        <Row justify={"center"} className="checkbox">
          <h1 className="h1_title">{dictionary["CONTACT"]}</h1>
        </Row>
        <div className="form-contact">
          <div className="form-contact-Container">
            <div className="form-contact-content-form">
              <div
                className={
                  isLogin || page === "contact"
                    ? "form-contact-login"
                    : "form-contact-nologin"
                }
              >
                <h4>
                  {lang === "ja" ? (
                    <>
                      お問い合わせフォームの利用は、
                      <Link href={`/${lang}/login`} key="login">
                        ログイン
                      </Link>{" "}
                      か
                      <Link href={`/${lang}/login`} key="register">
                        アカウント登録
                      </Link>
                      （無料）する必要があります。
                    </>
                  ) : (
                    <>
                      {dictionary["Please"]}{" "}
                      <Link href={`/${lang}/login`} key="login">
                        {dictionary["login"]}
                      </Link>{" "}
                      {dictionary["or"]}{" "}
                      <Link href={`/${lang}/login`} key="register">
                        {dictionary["register account"]}
                      </Link>
                      {dictionary["(Free) to use this feature"]}
                    </>
                  )}
                </h4>
              </div>
              <div className="form-contact-content-error-page">
                <span>※</span>
                <h3>{dictionary["Required fields"]}</h3>
              </div>
              {(page === "contact" ? titleContact : titleContactUser).map(
                (item) => (
                  <div
                    className="form-contact-content-item space-size"
                    key={item.name}
                  >
                    <div className="form-contact-content-label">
                      <h3>{dictionary[`${item.title}`]}:</h3>
                      <span>※</span>
                    </div>
                    <div className="form-contact-content-input">
                      <input
                        {...formikBag.getFieldProps(`${item.name}`)}
                        name={item.name}
                        className="input-content-item-contact"
                      />
                      {formikBag.errors[`${item.name}`] &&
                        formikBag.touched[`${item.name}`] && (
                          <span className="error_input">
                            {formikBag.errors[`${item.name}`]}
                          </span>
                        )}
                    </div>
                  </div>
                )
              )}

              <div className="form-contact-content-item space-size">
                <div className="form-contact-content-label">
                  <h3>{dictionary["Content"]}:</h3>
                  <span>※</span>
                </div>
                <div className="form-contact-content-input">
                  <textarea
                    {...formikBag.getFieldProps(
                      page === "expert" ? "content" : "description"
                    )}
                    className="input-content-item-contact"
                    style={{ height: "140px" }}
                  />
                  {page === "expert"
                    ? formikBag.errors.content &&
                      formikBag.touched.content && (
                        <span className="error_input">
                          {formikBag.errors.content}
                        </span>
                      )
                    : formikBag.errors.description &&
                      formikBag.touched.description && (
                        <span className="error_input">
                          {formikBag.errors.description}
                        </span>
                      )}
                  {}
                </div>
              </div>

              <div className="btn-contact-form">
                <button type="submit">{dictionary["Send"]}</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ModalContact
        isOpen={isOpen}
        setOpen={setOpen}
        handleReset={handleReset}
      />
    </div>
  );
};

export default ContactForm;
