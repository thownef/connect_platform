import { useSelector } from "react-redux";
import Image from "next/image";
import spin from "@/public/images/spin.gif";
import { RootState } from "@/store/reducer";

export default function Loading() {
  // const loading = useSelector((state: RootState) => state.loading.loading);
  // You can add any UI inside Loading, including a Skeleton.
  return "search loading ..."
}
