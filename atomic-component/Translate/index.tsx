"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Locale } from "@/util/constanst";
import Image from "next/image";
import "./index.scss";

const Translate = ({ lang }: { lang: Locale }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.toString() || "");
  const pathName = usePathname();
 
  const handleChangeInfo = useCallback(
    (e: { target: { value: string } }, searchTerm: string) => {
      const { value } = e.target;
      const nextRoute = pathName.replace(lang, value);
      if (searchTerm) {
        router.push(nextRoute + "?" + searchTerm);
      } else {
        router.push(nextRoute);
      }
    },
    [pathName]
  );

  useEffect(() => {
    if (!searchParams.size) {
      setSearchTerm("");
    } else {
      setSearchTerm(searchParams.toString());
    }
  }, [searchParams.size, searchParams.toString()]);

  return (
    <div className="translate_container">
      <div className="translate_left"></div>
      <div className="translate_right">
        <div className="flag_country">
          <input
            type="radio"
            value="vi"
            id="vi"
            name="language"
            checked={lang === "vi"}
            onChange={(e) => handleChangeInfo(e, searchTerm)}
          />
          <label htmlFor="vi">
            <div className="flag_icon">
              <Image width={50} height={50} src={"/images/logo2.png"} alt="" />
            </div>
          </label>
        </div>
        <div className="flag_country">
          <input
            type="radio"
            value="ja"
            id="ja"
            name="language"
            checked={lang === "ja"}
            onChange={(e) => handleChangeInfo(e, searchTerm)}
          />
          <label htmlFor="ja">
            <div className="flag_icon">
              <Image width={50} height={50} src={"/images/logo4.png"} alt="" />
            </div>
          </label>
        </div>
        <div className="flag_country">
          <input
            type="radio"
            value="en"
            id="en"
            name="language"
            checked={lang === "en"}
            onChange={(e) => handleChangeInfo(e, searchTerm)}
          />
          <label htmlFor="en">
            <div className="flag_icon">
              <Image width={50} height={50} src={"/images/logo3.png"} alt="" />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Translate;
