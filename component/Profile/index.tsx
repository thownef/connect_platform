"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import Link from "next/link";
import { message } from "antd";
import { Locale } from "@/util/constanst";
import "./index.scss";
import { getProfileCompany } from "@/store/profile/action";
import { RootState } from "@/store/reducer";
import Introduce from "./Introduce/Introduce";
import Package from "./Package/Package";
import Service from "./Service/Service";
import Team from "./Team/Team";
import Customer from "./Customer/Customer";
import Review from "./Review/Review";
import ContactForm from "./ContactForm/ContactForm";
import { CurrentUser } from "@/store/login/type";
import Info from "./Info/Info";
import { CompanyCustomer } from "@/store/profile/type";
import { CompanyInfo } from "@/store/info/type";
import { createViewLog } from "@/store/callApi";

const ProfileCompany = ({
  lang,
  dictionary,
  userId,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
  userId: number;
}) => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const user: CurrentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  );
  const company_info: CompanyInfo[] = useSelector(
    (state: RootState) => state.profile.company_info
  );
  const [isUpdated, setIsUpdated] = useState(false)
  const companyCustomer: CompanyCustomer[] = useSelector(
    (state: RootState) => state.profile.company_main_clients
  );
  const [isUser, setIsUser] = useState(false);

  const success = (message: string) => {
    messageApi.open({
      type: "success",
      content: message,
      duration: 1,
    });
  };
  const error = (message: string) => {
    messageApi.open({
      type: "error",
      content: message,
      duration: 1,
    });
  };

  useEffect(() => {
    if (company_info.length > 0) {
      setIsUpdated(true);
    } else {
      setIsUpdated(false);
    }
  }, [company_info]);

  useEffect(() => {
    dispatch(getProfileCompany(userId));
  }, [userId]);

  useEffect(() => {
    if (user && user.id === userId) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [user.id, userId]);

  useEffect(() => {
    if (slug && user.id && (user.id !== Number(slug))) {
      createViewLog({ user_id: Number(slug), company_seen_id: user.id });
    }
  }, [slug]);

  return (
    <>
      {contextHolder}
        {isUser && !isUpdated && <div className="profile__container">
          <div className="container_member_register">
            <Link href={`/${lang}/createprofile`}>
              {dictionary["Update Profile"]}
            </Link>
          </div>
        </div>}
          <Info
            lang={lang}
            dictionary={dictionary}
            isUser={isUser}
            id={userId}
            success={success}
            error={error}
            isUpdated={isUpdated}
            
          />
          <Introduce
            lang={lang}
            dictionary={dictionary}
            isUser={isUser}
            id={userId}
            success={success}
            error={error}
            isUpdated={isUpdated}
            
          />
          <Package
            lang={lang}
            dictionary={dictionary}
            isUser={isUser}
            success={success}
            error={error}
            isUpdated={isUpdated}
            
          />
          <Service
            lang={lang}
            dictionary={dictionary}
            isUser={isUser}
            success={success}
            error={error}
            isUpdated={isUpdated}
            
          />
          <Team
            lang={lang}
            dictionary={dictionary}
            isUser={isUser}
            success={success}
            error={error}
            isUpdated={isUpdated}
            
          />
          {(isUser || (companyCustomer && companyCustomer.length > 0)) && (
            <Customer
              lang={lang}
              dictionary={dictionary}
              isUser={isUser}
              success={success}
              error={error}
            isUpdated={isUpdated}
              
            />
          )}
          <Review lang={lang} dictionary={dictionary} isUser={isUser} />
          <ContactForm lang={lang} dictionary={dictionary} isUser={isUser} />
    </>
  );
};

export default ProfileCompany;
