import Image from "next/image";
import { Col, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImageDefault from "../../../public/images/data-not-found.png";
import { deleteItem } from "../util";

const Team = ({
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
      formikBag.setFieldValue(`members[${index}].member_picture`, file);
      formikBag.setFieldValue(
        `members[${index}].preview`,
        URL.createObjectURL(file)
      );
    }
  };

  const addNewItem = () => {
    if (formikBag.values.members.length < 4) {
      const newData = {
        id: Date.now(),
        member_name: "",
        member_position: "",
        member_position_EN: "",
        member_position_JP: "",
        member_picture: "",
        member_desc: "",
        member_desc_JP: "",
        member_desc_EN: "",
        preview: ImageDefault,
      };
      const updatedProducts = [...formikBag.values.members, newData];
      formikBag.setFieldValue("members", updatedProducts);
    }
  };

  return (
    <div className="member__core">
      <div className="member__description_title">
        <h4 style={{ fontWeight: "bold" }}>
          {dictionary["Company Core Members"]}
        </h4>
      </div>
      {formikBag.values.members.map((item: any, index: number) => (
        <Row gutter={16} key={item.id}>
          <Col xl={12} lg={12} md={24} xs={24}>
            <div className="member__core_title">
              {dictionary["Full Name"]}
              <span className="required">* </span>
            </div>
            <input
              className="member__core_input"
              type="text"
              {...formikBag.getFieldProps(`members[${index}].member_name`)}
            />
            {formikBag.errors.members &&
              formikBag.errors.members[index] &&
              formikBag.errors.members[index].member_name &&
              formikBag.touched.members &&
              formikBag.touched.members[index] &&
              formikBag.touched.members[index].member_name && (
                <span className="error_input">
                  {formikBag.errors.members[index].member_name}
                </span>
              )}
            <div className="member__core_title">
              {dictionary["Position (Vietnamese)"]}
            </div>
            <input
              className="member__core_input"
              {...formikBag.getFieldProps(`members[${index}].member_position`)}
            />
            <div className="member__core_title">
              {dictionary["Position (English)"]}
            </div>
            <input
              className="member__core_input"
              {...formikBag.getFieldProps(
                `members[${index}].member_position_EN`
              )}
            />
            <div className="member__core_title">
              {dictionary["Position (Japanese)"]}
            </div>
            <input
              className="member__core_input"
              {...formikBag.getFieldProps(
                `members[${index}].member_position_JP`
              )}
            />
          </Col>
          <Col span={12} xl={12} lg={12} md={24} xs={24}>
            <div className="member__core_title">
              {dictionary["Member Picture"]}
            </div>
            <Col xl={12}>
              <label htmlFor={`core_image${index}`}>
                {dictionary["Preferred: ( .jpg, .jpeg, .png)"]}
              </label>
            </Col>
            <Row align={"middle"}>
              <label
                htmlFor={`core_image${index}`}
                className="custom-file-upload"
              >
                <UploadOutlined />
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeImage(e, index)
                  }
                  id={`core_image${index}`}
                  type="file"
                  name="member_picture"
                  accept=".png, .jpeg, .jpg"
                />
              </label>
              <label htmlFor={`core_image${index}`}>
                {dictionary["Choose File"]}
              </label>
            </Row>
            <Image
              className="core__img"
              src={item.preview}
              alt=""
              width={400}
              height={100}
            />
          </Col>
          <Col className="member__core__des" xl={8} lg={24} md={24}>
            <div className="member__core_title">
              {dictionary["Member Description (Vietnamese)"]}
            </div>
            <textarea
              {...formikBag.getFieldProps(`members[${index}].member_desc`)}
              cols={42}
              rows={12}
            />
          </Col>
          <Col className="member__core__des" xl={8} lg={24} md={24}>
            <div className="member__core_title">
              {dictionary["Member Description (English)"]}
            </div>
            <textarea
              {...formikBag.getFieldProps(`members[${index}].member_desc_EN`)}
              cols={42}
              rows={12}
            />
          </Col>
          <Col className="member__core__des" xl={8} lg={24} md={24}>
            <div className="member__core_title">
              {dictionary["Member Description (Japanese)"]}
            </div>
            <textarea
              {...formikBag.getFieldProps(`members[${index}].member_desc_JP`)}
              cols={42}
              rows={12}
            />
          </Col>
          <Col span={12} className="delete_button">
            <button
              onClick={() => deleteItem(formikBag, "members", item.id, index)}
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
          <button onClick={addNewItem} className="member__button" type="button">
            {dictionary["Add New"]}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default Team;
