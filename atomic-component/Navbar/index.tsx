"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ISSERVER, Locale } from "@/util/constanst";
import {  CurrentUser } from "@/store/login/type";
import { RootState } from "@/store/reducer";
import { fetchDataStart } from "@/store/category/action";
import { Category } from "@/store/category/type";
import style from "./index.module.scss";
const Avatar = dynamic(() => import("./Avatar"), {
  loading: () => <div className="container"></div>,
});
import logo from '../../public/images/logovjpc.png';

const Navbar = ({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
}) => {
  let c_user;
  const dispatch = useDispatch()
  const allCategory: Category[] = useSelector(
    (state: RootState) => state.category
  );
  if (!ISSERVER) {
    c_user = localStorage.getItem("c_user");
  }
  const user: CurrentUser = useSelector((state: RootState) => {
    return state.auth.currentUser;
  });

  useEffect(()=>{
    if (sessionStorage.getItem('access_login')) {
      sessionStorage.clear()
      window.location.reload();
    }
    if(!allCategory.length) {
      dispatch(fetchDataStart())
    }
  }, [])

  return (
    <div className={style.navbar__container}>
      <div className={style.logo}>
        <Link href={`/${lang}`}>
          <Image
            src={logo}
            alt="logo"
          />
        </Link>
      </div>
      {!c_user && (
        <div className={style.navbar__menu__hidden}>
          <div className={style.navbar__left_menu}>
            <Link href={`/${lang}/login`}>
              <button className={style.button_member_register}>
              {dictionary["Account Register"]}
                  <br />
                  <span>({dictionary['FREE']})</span>
              </button>
            </Link>
          </div>
        </div>
      )}
      <div className={style.navbar__menu}>
        <div className={style.navbar__left_menu}>
          <Link href={`/${lang}`}>{dictionary["Home"]}</Link>
          <Link href={`/${lang}/about`}>{dictionary["About Us"]}</Link>
          <Link
            href={`/${lang}/search`}
          >
            {dictionary["Search"]}
          </Link>
          <Link href={`/${lang}/pricing`}>{dictionary["Pricing"]}</Link>
          <Link href={`/${lang}/contact`}>{dictionary["Contact"]}</Link>
          <Link href={`/${lang}/findexpert`}>{dictionary["Find an Expert"]}</Link>
          <Link href={`/${lang}/usermanual`}>{dictionary["User Manual"]}</Link>
          <Link href={`/${lang}/term`}>{dictionary["Terms of use"]}</Link>
          <Link href={`/${lang}/usermanual`}>{dictionary["User Manual"]}</Link>
          {!c_user && (
            <Link href={`/${lang}/login`}>
              <button className={style.button_member_register}>
                {dictionary["Account Register"]}
                  <br />
                  <span>({dictionary['FREE']})</span>
              </button>
            </Link>
          )}
        </div>
        <div className="right_menu"></div>
      </div>

      <Avatar lang={lang} dictionary={dictionary} user={user} />
    </div>
  );
};

export default Navbar;
