"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { scrollToTop } from "@/helper";
import { UpCircleOutlined } from "@ant-design/icons";
import "./index.scss";

const Zalo = () => {
  const pathName = usePathname();
  const isLoginPage = pathName.includes("login");
  return (
    <>
      <Script src="https://sp.zalo.me/plugins/sdk.js" />
        <div id="fb-root">
          <div
            className="zalo-chat-widget"
            data-oaid="4046650592372774845"
            data-welcome-message="Welcome to Viet Japan Partner"
            data-autopopup="3"
            data-width="350"
            data-height="420"
          ></div>
        </div>

      {!isLoginPage && (
        <div className="line-oa">
          <Link href={"https://page.line.me/724bxubl"} target="_blank">
            <i className="fa-brands fa-line" style={{ color: "#06c755" }} />
          </Link>
        </div>
      )}
      {!isLoginPage && (
        <div className="backtop_button">
          <UpCircleOutlined
            onClick={scrollToTop}
            style={{ fontSize: "34px", color: "#0c59db", cursor: "pointer" }}
          />
        </div>
      )}
    </>
  );
};
export default Zalo;
