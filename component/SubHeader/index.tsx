import React from "react"
import style from "./index.module.scss";

export default function SubHeader({
  subTitle
}: {
  subTitle: string|null
}) {
  return (
    <>
      <div className={style.sub_title}>
        <span className={style.sub_title_line}></span>
        <span>{subTitle}</span>
        <span className={style.sub_title_line}></span>
      </div>
    </>
  )
}