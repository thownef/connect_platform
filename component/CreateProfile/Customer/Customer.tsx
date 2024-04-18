import Image from "next/image";
import { Col, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImageDefault from "../../../public/images/data-not-found.png";
import { deleteItem } from "../util";

const Customer = ({
  formikBag,
  dictionary,
}: {
  formikBag: any;
  dictionary: { [key: string]: string };
}) => {
  const handleChangeImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      formikBag.setFieldValue(`clients[${index}].client_logo`, file);
      formikBag.setFieldValue(
        `clients[${index}].preview`,
        URL.createObjectURL(file)
      );
    }
  };
  const addNewItem = () => {
    if (formikBag.values.clients.length < 4) {
      const newData = {
        id: Date.now(),
        client_name: "",
        client_logo: "",
        client_url: "",
        client_url_EN: "",
        client_url_JP: "",
        preview: ImageDefault,
      };
      const updatedProducts = [...formikBag.values.clients, newData];
      formikBag.setFieldValue("clients", updatedProducts);
    }
  };
  return (
    <div className="member__clients">
      <div className="member__description_title">
        <h4 style={{ fontWeight: "bold" }}>{dictionary["Company Main Clients"]}</h4>
      </div>
      {formikBag.values.clients.map((item: any, index: number) => (
        <Row gutter={16} key={item.id}>
          <Col span={12} xl={12} lg={12} md={24} xs={24}>
            <div className="member__core_title">
            {dictionary["Client Company Name"]} <span className="required">* </span>
            </div>
            <input
              {...formikBag.getFieldProps(`clients[${index}].client_name`)}
              className="member__core_input"
            />
            {formikBag.errors.clients &&
              formikBag.errors.clients[index] &&
              formikBag.errors.clients[index].client_name &&
              formikBag.touched.clients &&
              formikBag.touched.clients[index] &&
              formikBag.touched.clients[index].client_name && (
                <span className="error_input">
                  {formikBag.errors.clients[index].client_name}
                </span>
              )}
          </Col>
          <Col span={12} xl={12} lg={12} md={24} xs={24}>
            <div className="member__core_title">{dictionary["Client Company Logo"]}</div>
            <Col xl={12}>
              <label htmlFor={`client_image${index}`}>
              {dictionary["Preferred: ( .jpg, .jpeg, .png)"]}
              </label>
            </Col>
            <Row align={"middle"}>
              <label
                htmlFor={`client_image${index}`}
                className="custom-file-upload"
              >
                <UploadOutlined />
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeImage(e, index)
                  }
                  id={`client_image${index}`}
                  type="file"
                  accept=".png, .jpeg, .jpg"
                />
              </label>
              <label htmlFor={`client_image${index}`}>{dictionary["Choose File"]}</label>
            </Row>

            <Image
              className="core__img"
              src={item.preview}
              alt=""
              width={400}
              height={100}
            />
          </Col>
          <Col span={24} xl={24} lg={24} md={24} xs={24}>
            <div className="member__core_title">{dictionary["URL (Viet Nam)"]}</div>
            <input
              {...formikBag.getFieldProps(`clients[${index}].client_url`)}
              className="member__core_input"
            />
            <div className="member__core_title">{dictionary["URL (English)"]}</div>
            <input
              {...formikBag.getFieldProps(`clients[${index}].client_url_EN`)}
              className="member__core_input"
            />
            <div className="member__core_title">{dictionary["URL (Japan)"]}</div>
            <input
              {...formikBag.getFieldProps(`clients[${index}].client_url_JP`)}
              className="member__core_input"
            />
          </Col>
          <Col
            span={12}
            xl={12}
            lg={12}
            md={12}
            xs={12}
            className="delete_button"
          >
            <button
              onClick={() => deleteItem(formikBag, "clients", item.id, index)}
              type="button"
            >
              {dictionary["Delete"]}
            </button>
          </Col>
        </Row>
      ))}
      <Row>
        <Col span={12}></Col>
        <Col span={12}>
          <button onClick={addNewItem} type="button" className="member__button">
          {dictionary["Add New"]}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default Customer;
