"use client";

import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import Translate from "../Translate";
import { Locale } from "@/util/constanst";
import { useEffect } from "react";
import { JwtPayload } from "@/store/login/type";
import { jwtDecode } from "jwt-decode";
import { getUserId, logout } from "@/store/login/action";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import('@/atomic-component/Navbar'), {
  ssr: false,
})

const HiddenHeader = ({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
}) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const isLoginPage = pathName.includes("login");
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) {
    let c_user = localStorage.getItem("c_user");
    let token = localStorage.getItem("accessToken");
    let userId: number;

    if (token) {
      const decoded = jwtDecode(token) as JwtPayload;
      userId = parseInt(decoded.id);
    }

    useEffect(() => {
      if (c_user && userId) {
        if (userId === parseInt(c_user)) {
          dispatch(getUserId(userId));
        } else {
          dispatch(logout());
        }
      }
    }, [c_user, token]);
  }

  return (
    <>
      {!isLoginPage && (
        <>
          <Translate lang={lang} />
          <Navbar lang={lang} dictionary={dictionary} />
        </>
      )}
    </>
  );
};

export default HiddenHeader;
