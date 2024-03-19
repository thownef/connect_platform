"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Col, Drawer, Dropdown, Tooltip } from "antd";
import { LogoutOutlined, UserOutlined, MenuOutlined } from "@ant-design/icons";
import { ISSERVER, Locale } from "@/util/constanst";
import style from "../index.module.scss";
import "./index.scss";
import Link from "next/link";
import { CurrentUser } from "@/store/login/type";
import { logout } from "@/store/login/action";
const AvatarDropDown = ({
  lang,
  dictionary,
  user,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
  user: CurrentUser;
}) => {
  const router = useRouter();
  let c_user;
  if (!ISSERVER) {
    c_user = localStorage.getItem("c_user");
  }
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logoutHandle = () => {
    dispatch(logout());
    router.push(`/${lang}`);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const items = [
    {
      key: "1",
      label: (
        <Link href={`/${lang}/profile/${c_user}`}>
          <UserOutlined style={{ marginRight: "20px" }} />
          {dictionary["Profile"]}
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link href={`/${lang}/mail`}>
          <UserOutlined style={{ marginRight: "20px" }} />
          {dictionary["Contact"]}
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <div onClick={() => logoutHandle()}>
          <LogoutOutlined style={{ marginRight: "18px" }} />{" "}
          {dictionary["Logout"]}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className={style.button__login}>
      <Tooltip
          title={
            <div>
              <h6 className={style.button__login__tooltip}>
                {user?.user_name}
              </h6>
              {lang === 'vi' ? (
                <>{user?.company_name}</>
              ) : lang === 'ja' ? (
                <>{user?.company_name_jp}</>
              ) : (
                <>{user?.company_name_en}</>
              )}
            </div>
          }
          placement="bottom"
        >
          <span className={style.button__login__name}>
            {user?.user_name.substring(0, 20)}
          </span>
        </Tooltip>
        {c_user ? (
          <Dropdown
            menu={{
              items,
            }}
          >
            <Image
              width={60}
              height={60}
              src={"/images/avatar.png"}
              alt={"avatar"}
              className="custom-avatar"
            />
          </Dropdown>
        ) : (
          <Link href={`/${lang}/login`}>
            <button>{dictionary["Login"]}</button>
          </Link>
        )}
      </div>
      <Col span={2} offset={30} className={style.menu__mobile}>
        <Col span={2} offset={30}>
          <MenuOutlined onClick={showDrawer} />
        </Col>
      </Col>

      <Drawer
        title={dictionary["Menu"]}
        placement="right"
        onClose={onClose}
        open={open}
        className={style.menu__mobile_item}
      >
        <Link href={`/${lang}`}>
          <span onClick={onClose}>{dictionary["Home"]}</span>
        </Link>
        <Link href={`/${lang}/about`}>
          <span onClick={onClose}>{dictionary["About Us"]}</span>
        </Link>
        <Link href={`/${lang}/search`}>
          <span onClick={onClose}>{dictionary["Search"]}</span>
        </Link>
        <Link href={`/${lang}/pricing`}>
          <span onClick={onClose}>{dictionary["Pricing"]}</span>
        </Link>
        <Link href={`/${lang}/contact`}>
          <span onClick={onClose}>{dictionary["Contact"]}</span>
        </Link>
        <Link href={`/${lang}/findexpert`}>
          <span onClick={onClose}>{dictionary["Find an Expert"]}</span>
        </Link>
        <Link href={`/${lang}/term`}>
          <span onClick={onClose}>{dictionary["Terms of use"]}</span>
        </Link>
        <Link href={`/${lang}/usermanual`}>
          <span onClick={onClose}>{dictionary["User Manual"]}</span>
        </Link>
        {!user.id && (
          <Link href={`/${lang}/login`}>
            <span onClick={onClose}>{dictionary["Account Register"]}</span>
          </Link>
        )}
        {!user.id ? (
          <Link href={`/${lang}/login`}>
            <UserOutlined style={{ marginRight: "20px" }} />
            {dictionary["Login"]}
          </Link>
        ) : (
          <>
            <Link href={`/${lang}/profile/${c_user}`}>
              <span onClick={onClose}>
              {dictionary["Profile"]}
              </span>
            </Link>
            <p className={style.button__login__name}>
              {user?.user_name.substring(0, 20)}
            </p>
            <p className={style.button__login__name}>
              {lang === "vi" ? (
                <>{user?.company_name}</>
              ) : lang === "ja" ? (
                <>{user?.company_name_jp}</>
              ) : (
                <>{user?.company_name_en}</>
              )}
            </p>
            <div
              onClick={() => {
                onClose();
                dispatch(logout());
              }}
            >
              <LogoutOutlined
                style={{ marginRight: "18px", display: "inline-flex" }}
              />
              {dictionary["Logout"]}
            </div>
          </>
        )}
      </Drawer>
    </>
  );
};
export default AvatarDropDown;
