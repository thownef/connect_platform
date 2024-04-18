import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Col, Form, Modal, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CompanyProduct } from "@/store/profile/type";
import { createCompanyProduct, getCompanyProduct, updateCompanyProduct } from "@/store/callApi";
import { STATUS_CODE } from "@/util/constanst";
import { endLoading, startLoading } from "@/store/loading/action";
import { removeImage, upload } from "@/helper";
import { getProfileCompany } from "@/store/profile/action";
import ImageProduct from "../../../../public/images/data-not-found.png";

const ModalPackage = ({
  dictionary,
  isOpen,
  setOpen,
  id,
  setEdit,
  success,
  error
}: {
  dictionary: { [key: string]: string };
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string | number;
  setEdit: React.Dispatch<React.SetStateAction<string | number>>;
  success: (message: string) => void;
  error: (message: string) => void;
}) => {
  const { slug } = useParams();
  const dispatch = useDispatch()
  const defaultData = {
    id: "",
    user_id: Number(slug),
    email: "",
    product_name: "",
    product_description: "",
    product_picture: "",
    product_url: "",
    product_name_EN: "",
    product_name_JP: "",
    product_description_EN: "",
    product_description_JP: "",
  }
  const [preview, setPreview] = useState<any>(ImageProduct)
  const [picture, setPicture] = useState<File | undefined>(undefined)
  const [data, setData] = useState<CompanyProduct>(defaultData);
  const handleClose = () => {
    setOpen(false);
    setData(defaultData)
    setPreview(ImageProduct)
    setPicture(undefined)
    setEdit(0)
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const getDataPackage = async (id: number | string) => {
    try {
      if (id) {
        const res = await getCompanyProduct(id);
        if (res && res.status === STATUS_CODE.SUCCESS) {
          setData(res.data.data);
          // Sau này sẽ bổ sung check link null sau
          if(res.data.data.product_picture){
            setPreview(res.data.data.product_picture)
          } else {
            setPreview(ImageProduct)
          }
        }
      }
    } catch (err) {}
  };

  const handleSubmit = async () => {
    dispatch(startLoading());
    try {
      if (!id) {
        let newData = { ...data };
        if (picture) {
          const imgUrl = await upload(picture, Number(slug));
          newData = { ...newData, product_picture: imgUrl };
        }
        const res = await createCompanyProduct(newData);
        if (res?.status === STATUS_CODE.SUCCESS) {
          success(res.data.message);
        } else {
          error(res?.data.message);
        }
      } else {
        let newData = { ...data };
  
        if (picture) {
          const imgUrl = await upload(picture, Number(slug));
          
          await removeImage(data.product_picture)
          newData = { ...newData, product_picture: imgUrl };
        }
  
        const res = await updateCompanyProduct(newData, id);
  
        if (res?.status === STATUS_CODE.SUCCESS) {
          success(res.data.message);
        } else {
          error(res?.data.message);
        }
      }
    } finally {
      dispatch(endLoading());
      dispatch(getProfileCompany(Number(slug)))
      handleClose()
    }
  };

  useEffect(() => {
    if (id) {
      getDataPackage(id);
    } else {
      setData(defaultData);
      setPreview(ImageProduct)
      setPicture(undefined)
    }
  }, [id]);
  return (
    <Modal
      open={isOpen}
      style={{
        maxWidth: 800,
      }}
      closable={false}
      footer={null}
    >
      <div className="model-title">
        <span>{!id ? dictionary["Create service information"] : dictionary["Edit service information"]}</span>
      </div>
      <hr />
      <Row>
        <Col span={12}>
          <Form layout="vertical">
            <Form.Item>
              <div>
                <div className="label-title">
                  <label>{dictionary["Service Name (Vietnamese)"]}</label>
                </div>
                <div className="label-info-company">
                  <input
                    onChange={handleChange}
                    name="product_name"
                    value={data.product_name}
                    className="info-input"
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item>
              <div>
                <div className="label-title">
                  <label>{dictionary["Service Name (English)"]}</label>
                </div>
                <div className="label-info-company">
                  <input
                    onChange={handleChange}
                    name="product_name_EN"
                    value={data.product_name_EN}
                    className="info-input"
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item>
              <div>
                <div className="label-title">
                  <label>{dictionary["Service Name (Japanese)"]}</label>
                </div>
                <div className="label-info-company">
                  <input
                    onChange={handleChange}
                    name="product_name_JP"
                    value={data.product_name_JP}
                    className="info-input"
                  />
                </div>
              </div>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12}>
          <div className="layout-content">
            <div className="layout-info-image">
              <div className="member__main_info_item">
                <h5>{dictionary["Company's Logo"]}</h5>
                <label htmlFor="image-package">
                  <Image
                    id="preview-image"
                    src={preview}
                    alt="avatar"
                    width={250}
                    height={180}
                  />
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label htmlFor="image-package" className="custom-file-upload">
                    <UploadOutlined style={{ marginLeft: 8 }} />
                    <input
                      id="image-package"
                      type="file"
                      name="image"
                      onChange={handleChangeImage}
                      accept=".png, .jpeg, .jpg"
                    />
                  </label>
                  <label htmlFor="image-package">{dictionary["Choose File"]}</label>
                </div>
                <span className="total-image">
                  {dictionary["Image size with length 600 and width 900!!"]}
                </span>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Form>
        <Form.Item>
          <div>
            <div className="label-title">
              <label>URL</label>
            </div>
            <div className="label-info-company">
              <input
                onChange={handleChange}
                name="product_url"
                value={data.product_url}
                className="info-input"
              />
            </div>
          </div>
        </Form.Item>
      </Form>
      <div className="content-editor">
        <div className="label-title">
          <label>{dictionary["Service Description (Vietnamese)"]}</label>
        </div>
        <Editor
          apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
          onEditorChange={(content, editor) => {
            setData({...data, product_description : content})
          }}
          value={data.product_description}
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
      <div className="content-editor">
        <div className="label-title">
          <label>{dictionary["Service Description (English)"]}</label>
        </div>
        <Editor
          apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
          onEditorChange={(content, editor) => {
            setData({...data, product_description_EN : content})
          }}
          value={data.product_description_EN}
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
      <div className="content-editor">
        <div className="label-title">
          <label>{dictionary["Service Description (Japanese)"]}</label>
        </div>
        <Editor
          apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
          onEditorChange={(content, editor) => {
            setData({...data, product_description_JP : content})
          }}
          value={data.product_description_JP}
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
      <hr />
      <div className="form-info-btn">
        <div className="btn-edit-company">
          <button onClick={handleSubmit} className="btn-edit">{dictionary["Save change"]}</button>
        </div>
        <div className="btn-edit-company">
          <button onClick={handleClose} className="btn-cancel">
          {dictionary["Close"]}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPackage;
