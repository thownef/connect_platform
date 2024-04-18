'use client'
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducer";
import Image from "next/image";
import spin from "@/public/images/spin.gif";
import "./index.scss"

const Spin = () => {
  const loading: boolean = useSelector((state: RootState) => state.loading.loading);
  return (
    <div className="spin__container">
      {loading && (
        <div className="loading">
          <Image src={spin} alt="Loading" />
        </div>
      )}
    </div>
  );
};

export default Spin;
