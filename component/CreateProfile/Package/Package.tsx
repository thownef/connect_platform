import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";
import { Col, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "../index.scss";
import InputError from "./component/InputError";
import ImageDefault from "../../../public/images/data-not-found.png";
import { deleteItem } from "../util";

const Package = ({
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
      formikBag.setFieldValue(`products[${index}].product_picture`, file);
      formikBag.setFieldValue(
        `products[${index}].preview`,
        URL.createObjectURL(file)
      );
    }
  };

  const addNewItem = () => {
    if (formikBag.values.products.length < 4) {
      const newProduct = {
        id: Date.now(),
        product_name: "",
        product_name_EN: "",
        product_name_JP: "",
        product_description: "",
        product_description_EN: "",
        product_description_JP: "",
        product_picture: "",
        product_url: "",
        preview: ImageDefault,
      };
      const updatedProducts = [...formikBag.values.products, newProduct];
      formikBag.setFieldValue("products", updatedProducts);
    }
  };

  return (
    <div className="member__services">
      <div className="member__description_title">
        <h4 style={{ fontWeight: "bold" }}>{dictionary["company services"]}</h4>
      </div>
      {formikBag.values.products.map((item: any, index: number) => (
        <Row key={item.id}>
          <Col
            span={12}
            xl={12}
            lg={12}
            md={24}
            xs={24}
            className="member__services_image"
          >
            <h5>{dictionary["Service Picture"]}</h5>
            <label htmlFor={`service_image${item.id}`}>
              {dictionary["Preferred: ( .jpg, .jpeg, .png)"]}
            </label>
            <Row align={"middle"}>
              <label className="custom-file-upload">
                <UploadOutlined
                  style={{ marginLeft: 7, display: "inline-flex" }}
                />
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeImage(e, index)
                  }
                  id={`service_image${item.id}`}
                  type="file"
                  name="product_picture"
                  accept=".png, .jpeg, .jpg"
                />
              </label>
              <label htmlFor={`service_image${item.id}`}>
                {dictionary["Choose File"]}
              </label>
            </Row>
            <Image src={item.preview} alt="" width={400} height={100} />
          </Col>
          <Col
            span={12}
            xl={12}
            lg={12}
            md={24}
            xs={24}
            className="member__services_content"
          >
            <div className="member__services_container">
              <h5 className="company-title-aaa">
                {dictionary["Service Name (Vietnamese)"]}
                <span className="required">* </span>
              </h5>
              <InputError
                formikBag={formikBag}
                item={"product_name"}
                index={index}
              />

              <h5>
                {dictionary["Service Name (English)"]}
                <span className="required">* </span>
              </h5>
              <InputError
                formikBag={formikBag}
                item={"product_name_EN"}
                index={index}
              />

              <h5>
                {dictionary["Service Name (Japanese)"]}
                <span className="required">* </span>
              </h5>
              <InputError
                formikBag={formikBag}
                item={"product_name_JP"}
                index={index}
              />

              <h5>{dictionary["URL"]}</h5>
              <input
                onChange={(e) =>
                  formikBag.setFieldValue(
                    `products[${index}].product_url`,
                    e.target.value
                  )
                }
                className="company_name"
              />
            </div>
          </Col>
          <Col span={24}>
            <Row gutter={[16, 16]} className="">
              <Col span={8} xl={8} lg={8} md={24} xs={24}>
                <div className="member__services_content_description">
                  <h5>{dictionary["Service Description (Vietnamese)"]}</h5>
                  <Editor
                    apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
                    onEditorChange={(content, editor) => {
                      formikBag.setFieldValue(
                        `products[${index}].product_description`,
                        content
                      );
                    }}
                    init={{
                      font_formats:
                        "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
                      height: 224,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | fontfamily | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div>
              </Col>
              <Col span={8} xl={8} lg={8} md={24} xs={24}>
                <div className="member__services_content_description">
                  <h5>{dictionary["Service Description (English)"]}</h5>
                  <Editor
                    apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
                    onEditorChange={(content, editor) => {
                      formikBag.setFieldValue(
                        `products[${index}].product_description_EN`,
                        content
                      );
                    }}
                    init={{
                      font_formats:
                        "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
                      height: 224,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | fontfamily | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div>
              </Col>
              <Col span={8} xl={8} lg={8} md={24} xs={24}>
                <div className="member__services_content_description">
                  <h5>{dictionary["Service Description (Japanese)"]}</h5>
                  <Editor
                    apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
                    onEditorChange={(content, editor) => {
                      formikBag.setFieldValue(
                        `products[${index}].product_description_JP`,
                        content
                      );
                    }}
                    init={{
                      font_formats:
                        "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
                      height: 224,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | fontfamily | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={12} className="delete_button">
            <button
              type="button"
              onClick={() => deleteItem(formikBag, "products", item.id, index)}
            >
              {dictionary["Delete"]}
            </button>
          </Col>
        </Row>
      ))}
      <Row>
        <Col span={12}></Col>
        <Col span={12}>
          <button type="button" onClick={addNewItem} className="member__button">
            {dictionary["Add New"]}
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default Package;
