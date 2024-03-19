import React from 'react';
import style from './index.module.scss';
import { Col, Row } from 'antd';

const Model = ({ data }) => {
  const { address, desc, logo, phone, website } = { ...data };
  return (
    <div className={style.member__container}>
      <Row>
        <Col lg={9} md={24} className={style.member__desc}>
          <div className={style.member__image}>
            <img src={logo} alt='' />
          </div>
        </Col>
        <Col lg={15} md={24} className={style.member__business}>
          <h4>BUSINESS</h4>
          <ul className={style.member__jobs}>
            {desc.map((item, index) => (
              <li className={style.member__jobs_item} key={index}>
                {item}
              </li>
            ))}
          </ul>
          <div>
            <h4>Company address</h4>
            <Row>
              <Col span={24} className={style.member__company_content}>
                <ul>
                  <h5>Address</h5>
                  <li>{address}</li>
                </ul>
                <ul>
                  <h5>Phone / Fax</h5>
                  <li>{phone}</li>
                </ul>
                <ul>
                  <h5>Website</h5>
                  <a className={style.website} href={website}>
                    {website}
                  </a>
                </ul>
              </Col>
            </Row>
          </div>
          <div className={style.member__business_background}>
            <img src='https://vijaba.com/uploads/img/members/city.png' alt='' />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Model;
