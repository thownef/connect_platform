"use client";
import { useState } from "react";
import { Locale } from "@/util/constanst";
import "./index.scss";
import Inbox from "./Inbox/Inbox";
import { Col, Row } from "antd";
import { titleMail } from "./constant";
import Sent from "./Sent/Sent";
import Expert from "./Expert/Expert";

const MailPage = ({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
}) => {
  const [active, setActive] = useState(1);
  const handleClick = (id: number) => {
    setActive(id);
  };
  return (
    <div className="page-list-contact">
      <Row
        gutter={[16, 16]}
        justify={"center"}
        className="list-contact-container"
      >
        <Col span={4} className="list-contact-container-left">
          <div className="list-contact-container-left-menu">
            {titleMail.map((item) => (
              <span
                onClick={() => handleClick(item.id)}
                key={item.id}
                className={active === item.id ? "mail__title--active" : ""}
              >
                {dictionary[item.title]}
              </span>
            ))}
          </div>
        </Col>
        <Col span={20}>
          {active === 1 && <Inbox dictionary={dictionary} />}
          {active === 2 && <Sent dictionary={dictionary} />}
          {active === 3 && <Expert dictionary={dictionary} />}
        </Col>
      </Row>
    </div>
  );
};

export default MailPage;
