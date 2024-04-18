"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Col, Row } from "antd";
import Link from "next/link";
import "@fortawesome/fontawesome-free/css/all.css";
import logo from "@/public/images/logovjpcfooter.png";
import logo1 from "@/public/images/logovjpgroup.png";
import style from "./index.module.scss";
import { Locale } from "@/util/constanst";

const Footer = ({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
}) => {
  const pathName = usePathname();
  const isLoginPage = pathName.includes("login");
  return (
    <>
      {!isLoginPage && (
        <div className={style.container}>
          <div className={style.wrapper}>
            <Row gutter={24}>
              <Col xl={8} lg={24} md={24} xs={24} className={style.widget}>
                <Image
                  width={290}
                  height={110}
                  className="logo-container"
                  src={logo}
                  alt=""
                />
                <p>
                  {
                    dictionary[
                      "VJP Connect Platform (VJP-CONNECT.COM) is a platform specializing in supporting business promotion, finding partners, experts , and connecting Vietnamese and Japanese company in many fields"
                    ]
                  }
                  {
                    dictionary[
                      "This platform is operated by Viet Japan Partner Cooperation company - a member of the Japanese business support ecosystem of Viet Japan Partner Group including companies operating in many fields: Trade Promotion, Technology, Development Technology resource development, Recruitment, Design, Marketing, Printing."
                    ]
                  }
                </p>
                <Image
                  height={110}
                  className="logo-container"
                  src={logo1}
                  alt=""
                />

                <ul className={style.social__list}>
                  <li>
                    <Link
                      href="https://www.facebook.com/vietjapanpartner"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="10"
                        viewBox="0 0 320 512"
                      >
                        <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                      </svg>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.google.com/maps/place/VIET+JAPAN+PARTNER+CO.,+LTD/@10.8550548,106.629378,15z/data=!4m6!3m5!1s0x3175293582e05b3f:0xf36e2a20d6e9aa63!8m2!3d10.8550548!4d106.629378!16s%2Fg%2F11ryskv9d4?entry=ttu"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <svg
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="20"
                        viewBox="0 0 640 512"
                      >
                        <path d="M386.1 228.5c1.8 9.7 3.1 19.4 3.1 32C389.2 370.2 315.6 448 204.8 448c-106.1 0-192-85.9-192-192s85.9-192 192-192c51.9 0 95.1 18.9 128.6 50.3l-52.1 50c-14.1-13.6-39-29.6-76.5-29.6-65.5 0-118.9 54.2-118.9 121.3 0 67.1 53.4 121.3 118.9 121.3 76 0 104.5-54.7 109-82.8H204.8v-66h181.3zm185.4 6.4V179.2h-56v55.7h-55.7v56h55.7v55.7h56v-55.7H627.2v-56h-55.7z" />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col xl={6} lg={8} md={24} xs={24} className={style.footer__list}>
                <h5> {dictionary["Menu"]}</h5>
                <ul>
                  <li>
                    <Link href={`/${lang}/`}>{dictionary["Home"]}</Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/about`}>
                      {dictionary["About Us"]}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/search`}>{dictionary["Search"]}</Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/pricing`}>
                      {dictionary["Pricing"]}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/contact`}>
                      {dictionary["Contact"]}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${lang}/findexpert`}>
                      {dictionary["Find an Expert"]}
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col
                xl={10}
                lg={16}
                md={24}
                xs={24}
                className={style.footer__list}
              >
                <h5>{dictionary["Contact Information"]}</h5>
                <div>
                  <span>{dictionary["company_name"]}</span>
                  <div className={style.footer_address}>
                  <i className="fas fa-map-marker-alt mrr-10"></i>
                    <span>{dictionary["P1.3-40, The Prince Residence, 17-19-21 Nguyen Van Troi Street, 14 Ward, Phu Nhuan District, HCM City, Vietnam"]}</span>
                  </div>
                </div>
                <div>
                  <i className="fas fa-phone mrr-10"></i>
                  (+84) 028 7303 8939
                </div>
                <div>
                  <i className="fas fa-envelope mrr-10"></i>
                  vjpconnect@vj-partner.com
                </div>
              </Col>
            </Row>
          </div>
          <div className={style.footerTitle}>
            <span>
              {
                dictionary[
                  "Copyright @2023 VIET JAPAN PARTNER. All rights reserved."
                ]
              }
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
