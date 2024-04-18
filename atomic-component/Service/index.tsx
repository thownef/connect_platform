"use client";
import Container from "../Container";
import "./index.scss";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { Locale } from "@/util/constanst";
import Row from "../Row";
import Col from "../Col";
import { serviceData } from "@/public/mock/data";
const Service = ({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
}) => {
  return (
    <Container>
      <Row className="service__wrapper">
        {serviceData.map((item) => (
          <Col key={item.id} xl={3} lg={4} md={6} sm={8} xs={12} className="service__element">
            <a href={`${lang}/${item.link}`}>
              <div className="service__box">
                <div className="service__box--icon">
                  <span>
                    <i className={item.icon}></i>
                  </span>
                </div>

                <div className="service__content">
                  <h3>{dictionary[`${item.title}`]}</h3>
                </div>
              </div>
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Service;