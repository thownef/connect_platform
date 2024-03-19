import React from "react"
import style from "./index.module.scss";
import DefaultBox from "..";
import SubHeader from "@/component/SubHeader";

export default function GuideBox({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DefaultBox>
        <div className={style.guide_box}>
          {children}
        </div>
      </DefaultBox>
    </>
  )
}