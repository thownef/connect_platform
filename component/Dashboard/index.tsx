"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import Header from "@/atomic-component/Header";
import Col from "@/atomic-component/Col";
import "./index.scss";
import SlideImage from "./SlideImage";
import Contact from "./Contact";
import CompanyVN from "./Company/companyVN";
import CompanyJP from "./Company/companyJP";
import SlidePartner from "./SlidePartner/";
const Service = dynamic(() => import("@/atomic-component/Service"), {
  ssr: false,
});
import { Locale } from "@/util/constanst";
import Search from "./Search/Index";

const DashBoard = ({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
}) => {
  return (
    <div className="Home_container" id="home">
      <Header type="landing" />
      <div className="events_matching_container" id="members">
        <Search lang={lang} dictionary={dictionary} />
        <h3 className="matching_title">{dictionary["Prominent Partners"]}</h3>
        <div className="title">
          <div className="oth-sub-header-home">
            <span className="font-index"></span>
            {lang === "ja" ? (
              <>
                <span className="title-red">{dictionary["Japan"] + " "}</span>
                {dictionary["Representative Company In"]}
              </>
            ) : (
              <>
                {dictionary["Representative Company In"] + " "}
                <span className="title-red">{dictionary["Japan"]}</span>
              </>
            )}
            <span className="font-index"></span>
          </div>
        </div>
        <Col span={12}>
          <CompanyJP lang={lang} dictionary={dictionary} />
        </Col>

        <div className="title">
          <div className="oth-sub-header-home">
            <span className="font-index"></span>
            {lang === "ja" ? (
              <>
                <span className="title-red">{dictionary[`Viet Nam`]}</span>
                {dictionary["Representative Company In"]}
              </>
            ) : (
              <>
                {dictionary["Representative Company In"]}{" "}
                <span className="title-red">{dictionary[`Viet Nam`]}</span>
              </>
            )}
            <span className="font-index"></span>
          </div>
        </div>
        <Col span={12}>
          <CompanyVN lang={lang} dictionary={dictionary} />
        </Col>
      </div>

      <div className="events_matching_container" id="professional">
        <h3 className="matching_title">{dictionary["SUPPORTING EXPERTS"]}</h3>
        <h1 className="title">
          <div className="oth-sub-header-home">
            <span className="font-index"></span>
            <span className="title-red"></span>{" "}
            {dictionary["Representative experts"]}
            <span className="font-index"></span>
          </div>
        </h1>
        <SlideImage lang={lang} dictionary={dictionary} />
        <div className="btn-content-expert" id="contact">
          <Link href={`/${lang}/findexpert`}>
            {dictionary["View All Experts"]}
          </Link>
        </div>
      </div>
      <div className="events_matching_container">
        <h3 className="matching_title">{dictionary["contact us"]}</h3>
        <Contact lang={lang} dictionary={dictionary} />
      </div>
      <div className="events_matching_container">
        <h3 className="matching_title">{dictionary["industry"]}</h3>
        <Service lang={lang} dictionary={dictionary} />
      </div>
      <div className="events_matching_container" id="client">
        <h3 className="matching_title">
          {dictionary["partners and customers"]}
        </h3>
        <SlidePartner />
      </div>
    </div>
  );
};

export default DashBoard;
