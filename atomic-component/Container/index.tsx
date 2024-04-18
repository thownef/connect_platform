import React, { ReactNode } from 'react'
import style from './index.module.scss'

interface Container {
  children: ReactNode
}
const Container: React.FC<Container> = ({ children }) => {
  return <div className={style.container}>{children}</div>
}

export default Container
