import React from "react"
import style from "./index.module.scss";

export default function DefaultBox({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <section className={style.default_box}>
        {children}
      </section>
    </>
  )
}