// components/Col.tsx
import { ReactNode } from "react";
import "./Col.scss";
interface ColProps {
  children: ReactNode;
  span?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
  className?: string;
  key?: any;
}

const Col: React.FC<ColProps> = ({
  children,
  span,
  xl,
  lg,
  md,
  sm,
  xs,
  className,
}) => {
  return (
    <div
      className={`col ${span ? `col-span-${span}` : ""} ${
        xl ? `col-xl-${xl}` : ""
      } ${lg ? `col-lg-${lg}` : ""} ${md ? `col-md-${md}` : ""} ${sm ? `col-sm-${sm}` : ""} ${
        xs ? `col-xs-${xs}` : ""
      } ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Col;
