"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Auth } from "@/store/login/type";
import { RootState } from "@/store/reducer";
import { Locale } from "@/util/constanst";
import Row from "../Row";
import Col from "../Col";
import "./index.scss";
import { JPCompany } from "@/store/dashboard/type";
import logo1 from "../../public/images/logo1.png";
import logon from "../../public/images/ctynhat.png";
import logonva from "../../public/images/ctynva.png";
import logona from "../../public/images/ctyna.png";
import logonv from "../../public/images/ctynv.png";

import logov from "../../public/images/ctyv.png";
import logovn from "../../public/images/ctyvn.png";
import logova from "../../public/images/ctyva.png";
import logovna from "../../public/images/ctyvna.png";

interface Company {
  lang: Locale;
  dictionary: { [key: string]: string };
  data: JPCompany;
}

const Company: React.FC<Company> = ({ lang, dictionary, data }) => {
  const user: Auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const handleClick = (id: string | number) => {
    if (!user) {
      router.push(`/${lang}/login`);
    } else {
      router.push(`/${lang}/profile/${id}`);
    }
  };
  return (
    <Row className="company__container">
      <Col xl={3} lg={3} md={3} sm={3} xs={12} className="company__left">
        <div>
          <div className="company__left--image">
            <img className="img" src={data.company_logo} alt="logo" />
          </div>
          <div className="company__left--country">
            <Image
              src={logo1}
              style={{ height: "auto" }}
              alt="logo"
              width={60}
            />
            {data.country === "Viet Nam" ? (
              data.languages.includes("japan") &&
              data.languages.includes("english") ? (
                <Image
                  src={logovna}
                  style={{ height: "auto" }}
                  alt="logo"
                  height={0}
                />
              ) : data.languages.includes("japan") ? (
                <Image src={logovn} style={{ height: "auto" }} alt="logo" />
              ) : data.languages.includes("english") ? (
                <Image src={logova} style={{ height: "auto" }} alt="logo" />
              ) : (
                <Image src={logov} style={{ height: "auto" }} alt="logo" />
              )
            ) : data.languages.includes("vietnam") &&
              data.languages.includes("english") ? (
              <Image src={logonva} style={{ height: "auto" }} alt="logo" />
            ) : data.languages.includes("vietnam") ? (
              <Image src={logonv} style={{ height: "auto" }} alt="logo" />
            ) : data.languages.includes("english") ? (
              <Image src={logona} style={{ height: "auto" }} alt="logo" />
            ) : (
              <Image src={logon} style={{ height: "auto" }} alt="logo" />
            )}
          </div>
          <div className="company__left--button">
            <button onClick={() => handleClick(data.id)}>
              {dictionary["Detail"]}
            </button>
          </div>
        </div>
      </Col>
      <Col xl={9} lg={9} md={9} sm={9} xs={12} className="company__right">
        <div className="company__right--content">
          {lang === "vi" ? (
            <>
              <h3 className="text-truncate ">{data.company_name}</h3>
            </>
          ) : lang === "ja" ? (
            <>
              <h3 className="text-truncate ">{data.company_name_jp}</h3>
            </>
          ) : (
            <>
              <h3 className="text-truncate ">{data.company_name_en}</h3>
            </>
          )}
          <p className="text-truncate ">
            {dictionary["Establishment"]}: {data.estalishment}
          </p>
          <p className="text-truncate ">
            {dictionary["Employers"]}:{" "}
            {!data.employers ? dictionary["Updating"] : data.employers}
          </p>
          <p className="text-truncate ">
            {dictionary["Capital"]}: {" "}
            {!data.capital ? dictionary["Updating"] : data.capital}
          </p>
          <p className="text-truncate ">
            {lang === "vi" ? (
              <>
                {dictionary["Address"]}: {data.address_vn}
              </>
            ) : lang === "ja" ? (
              <>
                {dictionary["Address"]}: {data.address_jp}
              </>
            ) : (
              <>
                {dictionary["Address"]}: {data.address_en}
              </>
            )}
          </p>
          <p className="text-truncate ">
            {dictionary["Category"]}:{" "}
            {lang === "vi" ? (
              <>{data.category_vn}</>
            ) : lang === "ja" ? (
              <>{data.category_jp}</>
            ) : (
              <>{data.category_en}</>
            )}
          </p>
          <p className="text-truncate ">
            {dictionary["Needs"]}:{" "}
            {!data.needs_en ? dictionary["Updating"] : ""}
            {lang === "vi" ? (
              <>{data.needs_vn}</>
            ) : lang === "ja" ? (
              <>{data.needs_jp}</>
            ) : (
              <>{data.needs_en}</>
            )}
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default Company;
