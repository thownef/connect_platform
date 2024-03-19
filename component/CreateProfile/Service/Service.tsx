import Image from "next/image";
import { Col, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const Service = ({
  formikBag,
  dictionary,
}: {
  formikBag: any;
  dictionary: { [key: string]: string };
}) => {
  const handleChangeImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      formikBag.setFieldValue(`specialities[${id}].speciality_picture`, file);
      formikBag.setFieldValue(
        `specialities[${id}].preview`,
        URL.createObjectURL(file)
      );
    }
  };

  return (
    <div className="member__features">
      <div className="member__description_title">
        <h4 style={{ fontWeight: "bold", marginBottom: "40px" }}>
          {dictionary["Company Features"]}
        </h4>
      </div>
      <Row gutter={[32, 0]}>
        {formikBag.values.specialities.map((item: any, index: number) => (
          <Col
            span={8}
            xl={8}
            lg={8}
            md={24}
            xs={24}
            className="member__features_content"
            key={item.id}
          >
            <Row align={"middle"}>
              <span>
                {dictionary["Feature"]} {item.id}
              </span>
              <div className="member__features_image">
                <Image src={item.preview} width={100} height={100} alt="" />
              </div>
            </Row>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label className="custom-file-upload">
                <UploadOutlined style={{ marginLeft: 5 }} />
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeImage(e, index)
                  }
                  id={`speciality_image${index}`}
                  className="member__features_input1"
                  type="file"
                  name={`speciality_image${index}`}
                  accept=".png, .jpeg, .jpg"
                  style={{ width: 400, height: 100 }}
                />
              </label>
              <label htmlFor={`speciality_image${index}`}>
                {dictionary["Choose File"]}
              </label>
            </div>
            <h6>{dictionary["Feature Description (Vietnamese)"]}</h6>
            <input
              {...formikBag.getFieldProps(
                `specialities[${index}].speciality_desc`
              )}
              className="member__features_input2"
            />
            <h6>{dictionary["Feature Description (English)"]}</h6>
            <input
              {...formikBag.getFieldProps(
                `specialities[${index}].speciality_desc_en`
              )}
              className="member__features_input2"
            />
            <h6>{dictionary["Feature Description (Japanese)"]}</h6>
            <input
              {...formikBag.getFieldProps(
                `specialities[${index}].speciality_desc_jp`
              )}
              className="member__features_input2"
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Service;
