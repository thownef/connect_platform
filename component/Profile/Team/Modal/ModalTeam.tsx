import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Col, Form, Modal, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CompanyCoreMember } from "@/store/profile/type";
import ImageDefault from "../../../../public/images/data-not-found.png";
import { createCompanyCoreMember, getCompanyCoreMember, updateCompanyCoreMember } from "@/store/callApi";
import { STATUS_CODE } from "@/util/constanst";
import { endLoading, startLoading } from "@/store/loading/action";
import { removeImage, upload } from "@/helper";
import { getProfileCompany } from "@/store/profile/action";

const ModalTeam = ({
  dictionary,
  isOpen,
  setOpen,
  id,
  setEdit,
  success,
  error,
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
  const dispatch = useDispatch();
  const defaultData = {
    id: "",
    user_id: Number(slug),
    email: "",
    member_name: "",
    member_position: "",
    member_picture: "",
    member_desc: "",
    member_desc_JP: "",
    member_desc_EN: "",
    member_position_EN: "",
    member_position_JP: "",
  };

  const [preview, setPreview] = useState<any>(ImageDefault);
  const [picture, setPicture] = useState<File | undefined>(undefined);
  const [data, setData] = useState<CompanyCoreMember>(defaultData);

  const handleClose = () => {
    setOpen(false);
    setEdit(0);
    setData(defaultData);
    setPreview(ImageDefault);
    setPicture(undefined);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const getData = async (id: string | number) => {
    try {
      if (id) {
        const res = await getCompanyCoreMember(id);
        if (res && res.status === STATUS_CODE.SUCCESS) {
          setData(res.data.data);
          if (res.data.data.member_picture) {
            setPreview(res.data.data.member_picture);
          } else {
            setPreview(ImageDefault);
          }
        }
      }
    } catch (err) {}
  };

  const handleSubmit = async () => {
    dispatch(startLoading());
    let newData = { ...data };
    try {
      if (!id) {
        if (picture) {
          const imgUrl = await upload(picture, Number(slug));
          newData = { ...newData, member_picture: imgUrl };
        }
        const res = await createCompanyCoreMember(newData);
        if (res?.status === STATUS_CODE.SUCCESS) {
          success(res.data.message);
        } else {
          error(res?.data.message);
        }
      } else {
        if (picture) {
          const imgUrl = await upload(picture, Number(slug));
          if (data.member_picture) {
            await removeImage(data.member_picture);
          }
          newData = { ...newData, member_picture: imgUrl };
        }

        const res = await updateCompanyCoreMember(newData, id);
        if (res?.status === STATUS_CODE.SUCCESS) {
          success(res.data.message);
        } else {
          error(res?.data.message);
        }
      }
    } finally {
      dispatch(endLoading());
      dispatch(getProfileCompany(Number(slug)));
      handleClose();
    }
  };

  useEffect(() => {
    if (id) {
      getData(id);
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
        <span>{!id ? dictionary["Create core member information"] : dictionary["Edit core member information"]}</span>
      </div>
      <hr />
      <Row>
        <Col span={12}>
          <Form>
            <Form.Item className="item-design">
              <div>
                <div className="label-title">
                  <label>{dictionary["User name"]}</label>
                </div>
                <div className="label-info-company">
                  <input onChange={handleChange} value={data.member_name} name="member_name" className="info-input" />
                </div>
              </div>
            </Form.Item>
            <Form.Item className="item-design">
              <div>
                <div className="label-title">
                  <label>{dictionary["Position (Vietnamese)"]}</label>
                </div>
                <div className="label-info-company">
                  <input onChange={handleChange} value={data.member_position} name="member_position" className="info-input" />
                </div>
              </div>
            </Form.Item>
            <Form.Item className="item-design">
              <div>
                <div className="label-title">
                  <label>{dictionary["Position (English)"]}</label>
                </div>
                <div className="label-info-company">
                  <input onChange={handleChange} value={data.member_position_EN} name="member_position_EN" className="info-input" />
                </div>
              </div>
            </Form.Item>
            <Form.Item className="item-design">
              <div>
                <div className="label-title">
                  <label>{dictionary["Position (Japanese)"]}</label>
                </div>
                <div className="label-info-company">
                  <input onChange={handleChange} value={data.member_position_JP} name="member_position_JP" className="info-input" />
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
                <label htmlFor="image-team">
                  <Image
                    id="preview-image"
                    src={preview}
                    alt="avatar"
                    width={250}
                    height={180}
                  />
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label htmlFor="image-team" className="custom-file-upload">
                    <UploadOutlined style={{ marginLeft: 8 }} />
                    <input
					            onChange={handleChangeImage}
                      id="image-team"
                      type="file"
                      name="image"
                      accept=".png, .jpeg, .jpg"
                    />
                  </label>
                  <label htmlFor="image-team">{dictionary["Choose File"]}</label>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <div className="content-editor">
        <div className="label-title">
          <label>{dictionary["Member Description (Vietnamese)"]}</label>
        </div>
        <Editor
          apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
          onEditorChange={(content, editor) => {
			setData({...data, member_desc: content})
		  }}
		  value={data.member_desc}
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
          <label>{dictionary["Member Description (English)"]}</label>
        </div>
        <Editor
          apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
          onEditorChange={(content, editor) => {
			setData({...data, member_desc_EN: content})
		  }}
		  value={data.member_desc_EN}
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
          <label>{dictionary["Member Description (Japanese)"]}</label>
        </div>
        <Editor
          apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
          onEditorChange={(content, editor) => {
			setData({...data, member_desc_JP: content})
		  }}
		  value={data.member_desc_JP}
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

export default ModalTeam;
