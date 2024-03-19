// import { Image } from 'antd';
import Image from "next/image";
import style from "./index.module.scss";
import React from 'react';

export default function GuideCard ({
  image,
  children
}: {
  image: string|any,
  children: React.ReactNode
}) {
  return (
    <>
      <div className={style.step}>
        <div className={style.step_left}>
          {children}
        </div>
        <div className={style.step_right}>
          <Image style={{ height: "100%" , width: "100%"}} src={image} alt="guide-imgage"/>
        </div>
      </div>
    </>
  );
};