"use client";
import { Col, Row } from "antd";
import "./index.scss";
import { infovjbc, infovjbcMap, infovjp, infovjpMap } from "./constant";
import logo from '../../public/images/logovjpcfooter.png';
import logoGroup from '../../public/images/logovjpgroup.png';
import Introduce from "./Introduce/Introduce";

const AboutPage = ({
  dictionary,
}: {
  dictionary: { [key: string]: string };
}) => {
  return (
    <div className="aboutus__wrapper">
      <div className="aboutus__title">
        <h1>{dictionary["About Us"]}</h1>
      </div>
      <div className="aboutus__section">
        <div className="aboutus__content">
          <h2>{dictionary["Message from Founder"]}</h2>
          <Row gutter={[16, 16]}>
            <Col lg={6} md={8} xs={24}>
              <img
                src="https://vjp-connect-upload.s3.ap-southeast-1.amazonaws.com/thangvo.png"
                alt="vjp"
              />
            </Col>

            <Col lg={18} md={16} xs={24}>
              <p>
                {
                  dictionary[
                    "As a business person and understand the cultural differences between the two countries Vietnam and Japan, I wish to build a platform to support businesses with needs for business connection and cooperation. Together, the two countries can 'find' each other easily and at the most optimal cost. The VJP Connect Platform idea was realized in 2023 after Vietnam - Japan business connection events took place offline and online that I myself or my company team had the opportunity to participate in or support."
                  ]
                }
              </p>
              <br />
              <p>
                {
                  dictionary[
                    "We will strive to develop this platform to be a gathering place for business enterprises in accordance with the following criteria: Honesty - Commitment - Responsibility - Positivity - Efficiency as explained below:"
                  ]
                }
              </p>
              <p>
                {dictionary["- Honesty: Do not deceive customers and partners"]}
              </p>
              <p>
                {
                  dictionary[
                    "- Commitment: Always strive to comply with commitments, meet the quality of goods and services from the expected level upwards."
                  ]
                }
              </p>
              <p>
                {
                  dictionary[
                    "- Responsibility: Have a mindset and exercise full responsibility towards relevant parties in business cooperation. Make certain contributions to social responsibility."
                  ]
                }
              </p>
              <p>
                {
                  dictionary[
                    "- Positive: Sincerely listen and be ready to work with partners to overcome differences in culture, language, customs, habits, and agency barriers to achieve successful, win-win cooperation results. win, lasting."
                  ]
                }
              </p>
              <p>
                {
                  dictionary[
                    "- Efficiency: Always strive to achieve the highest 'effectiveness' in cooperation. Support breakthrough and creative solutions, as well as be willing to change or optimize traditional processes to achieve highly effective cooperation results for both parties."
                  ]
                }
              </p>
              <br />
              <p>
                {
                  dictionary[
                    "We believe that the above core values ​​will promote sustainable development and success for participating businesses."
                  ]
                }
              </p>
              <br />
              <p>
                {
                  dictionary[
                    "Finally, I and the staff of Viet Japan Partner Cooperation (VJPC) in particular and Viet Japan Partner Group (VJP Group) in general are committed to building the VJP Connect Platform to support Vietnamese and Japanese businesses connect. connect and cooperate effectively. The VJP Connect platform will be where businesses can find reliable partners, build relationships and create business opportunities. The goal in 2024 is to have more than 1,000 accounts successfully registered on the system. We hope to receive everyone's support and help on this journey."
                  ]
                }
              </p>
              <br />
              <p>{dictionary["Sincerely thank you!"]}</p>
              <p>{dictionary["Thang Vo"]}</p>
              <p>{dictionary["Representative of Viet Japan Partner Group"]}</p>
              <p>{dictionary["CEO of Viet Japan Partner Co.,LTD"]}</p>
              <p>{dictionary["CEO of Viet Japan Digital Co.,LTD"]}</p>
              <p>
                {dictionary["CEO of Viet Japan Partner Cooperation Co.,LTD"]}
              </p>
            </Col>
          </Row>
        </div>
      </div>

      <Introduce dictionary={dictionary} data={infovjbc} googleMap={infovjbcMap} logo={logo} />
      <Introduce dictionary={dictionary} data={infovjp} googleMap={infovjpMap} logo={logoGroup}/>
    </div>
  );
};

export default AboutPage;
