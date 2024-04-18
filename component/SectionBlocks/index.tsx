import React from "react"
import style from "./index.module.scss";

export default function SectionBlock({
  children
}: {
  children: React.ReactNode
}) {
  return (<>
    <section className={style.section_block}>
      <div className={style.section_block__content}>
        {children}
      </div>
    </section>
  </>)
}