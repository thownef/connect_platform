"use client";
import { Table } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Locale } from "@/util/constanst";
import "./index.scss";
import { pricingData } from "./constant";
import ContactForm from "@/atomic-component/ContactForm/Index";

const PricingPage = ({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
}) => {
  const columns = [
    {
      title: "",
      dataIndex: "service",
      className: "pricing__noncolumn",
      render: (text: string, record: any) => (
        <>{`${record.key}. ${dictionary[text]}`}</>
      ),
    },
    {
      title: (
        <div className="pricing__title" style={{ height: "100%" }}>
          Free
        </div>
      ),
      dataIndex: "free",
      className: "pricing__column",
      render: (text: string, record: any) => (
        <div className="pricing__content">
          {record.freeCheck ? <CheckOutlined /> : <CloseOutlined />}
          {`${dictionary[text]}`}
        </div>
      ),
    },
    {
      title: (
        <div className="pricing__title" style={{ height: "100%" }}>
          Lite
          <br />
          <p>{dictionary["15 $"]}</p>
        </div>
      ),
      dataIndex: "lite",
      className: "pricing__column",
      render: (text: string, record: any) => (
        <div
          className={
            record.liteCheck
              ? "pricing__content standardCheck"
              : "pricing__content"
          }
        >
          {record.liteCheck ? <CheckOutlined /> : <CloseOutlined />}
          {` ${dictionary[text]}`}
        </div>
      ),
    },
    {
      title: (
        <div className="pricing__title">
          Standard
          <br />
          <p>{dictionary["80 $"]}</p>
        </div>
      ),
      dataIndex: "standard",
      className: "pricing__column",
      render: (text: string, record: any) => (
        <div
          className={
            record.standardCheck
              ? "pricing__content standardCheck"
              : "pricing__content"
          }
        >
          {record.standardCheck ? <CheckOutlined /> : <CloseOutlined />}
          {` ${dictionary[text]}`}
        </div>
      ),
    },

    {
      title: (
        <div className="pricing__title">
          Customize
          <br />
          <p>1.5 Triệu VNĐ</p>
        </div>
      ),
      dataIndex: "customize",
      className: "pricing__column",
      render: (text: string, record: any) => (
        <div
          className={
            record.isCustomize === 1
              ? "pricing__content standardCheck"
              : record.isCustomize === 2
              ? "pricing__content premiumCheck"
              : "pricing__content"
          }
        >
          {record.standardCheck ? <CheckOutlined /> : <CloseOutlined />}
          {text}
        </div>
      ),
      show: lang === "vi" ? true : false,
    },

    {
      title: (
        <div className="pricing__title">
          Premium
          <br />
          <p>{dictionary["160 $"]}</p>
        </div>
      ),
      dataIndex: "premium",
      className: "pricing__column",
      render: (text: string, record: any) => (
        <div
          className={
            record.premiumCheck
              ? "pricing__content premiumCheck"
              : "pricing__content standardCheck"
          }
        >
          <CheckOutlined />
          {` ${dictionary[text]}`}
        </div>
      ),
    },
  ];
  return (
    <div className="pricing__wrapper">
      <h1>{dictionary["PRICE"]}</h1>
      <div className="pricing__note">
        <p>
          {
            dictionary[
              "The VJP Connect platform offers basic free usage, however for users who need private interpretation and consulting services, we offer paid support packages."
            ]
          }
        </p>
        <p>
          {
            dictionary[
              "Please see the price list information below and contact us if you have any questions."
            ]
          }
        </p>
        <h3>
          <span>(*)</span>
          {dictionary["Note"]}:
        </h3>
        <p className="pricing__note__p">
          {
            dictionary[
              "The following costs are only collected once, not an annual fee"
            ]
          }
        </p>
        <p className="pricing__note__p">
          {
            dictionary[
              "In case of upgrading the package midway, the amount of the current package will be deducted"
            ]
          }
        </p>
        <p className="">
          {
            dictionary[
              "In case of Standard and Premium packages, if customers can create their own multilingual profile, they will receive a discount of 15 $"
            ]
          }
        </p>
      </div>
      <Table
        bordered
        columns={columns.filter((column) => column.show !== false)}
        dataSource={pricingData}
        pagination={false}
        scroll={{
          x: 600,
        }}
      />
	  <ContactForm lang={lang} dictionary={dictionary} page="contact" />
    </div>
  );
};

export default PricingPage;
