import React, { ReactNode } from 'react'
import './Row.scss'

interface RowProps {
  children: ReactNode;
  className?: string;
}

const Row: React.FC<RowProps> = ({ children, className }) => {
  return <div className={`row ${className}`}>{children}</div>
}

export default Row
