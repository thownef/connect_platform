import { getCompanyIntroduce, updateCompanyIntroduce } from "@/store/callApi";
import { endLoading, startLoading } from "@/store/loading/action";
import { getProfileCompany } from "@/store/profile/action";
import { CompanyDescription } from "@/store/profile/type";
import { STATUS_CODE } from "@/util/constanst";
import { Editor } from "@tinymce/tinymce-react";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Edit = ({
  dictionary,
  isOpen,
  setOpen,
  id,
  success,
  error,
}: {
  dictionary: { [key: string]: string };
  isOpen: boolean;
  setOpen: any;
  id: string | number;
  success: (message: string) => void;
  error: (message: string) => void;
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<CompanyDescription>({
    id: "",
    user_id: "",
    email: "",
    description: "",
    descriptionEN: "",
    descriptionJP: "",
  });

  const getDataIntroduce = async () => {
    try {
      if (id) {
        const res = await getCompanyIntroduce(id);
        if (res && res.status === STATUS_CODE.SUCCESS) {
          setData(res.data.data);
        }
      }
    } catch (err) {}
  };

  const handleChange = (content: string, name: string) => {
    setData({ ...data, [name]: content });
  };

  const handleClose = () => {
    setOpen(false);
    getDataIntroduce();
  };

  const handleSubmit = async () => {
    if (id) {
      try {
        dispatch(startLoading());
        const res = await updateCompanyIntroduce(data, id);
  
        if (res?.status === STATUS_CODE.SUCCESS) {
          success(res.data.message);
        } else {
          error(res?.data.message);
        }
      } finally {
        dispatch(getProfileCompany(id))
        handleClose();
        dispatch(endLoading());
      }
    }
  };

  useEffect(() => {
    if (id) {
      getDataIntroduce();
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
        <span>{dictionary["EDIT INTRODUCTION"]}</span>
      </div>
      <hr />
      <div className="content-editor">
        <div className="label-title">
          <label>{dictionary["Company Description (Vietnamese)"]}</label>
        </div>
        <Editor
          apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
          onEditorChange={(content, editor) => {
            handleChange(content, "description");
          }}
          value={data?.description}
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
          <label>{dictionary["Company Description (English)"]}</label>
        </div>
        <Editor
          apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
          onEditorChange={(content, editor) => {
            handleChange(content, "descriptionEN");
          }}
          value={data?.descriptionEN}
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
          <label>{dictionary["Company Description (Japanese)"]}</label>
        </div>
        <Editor
          apiKey="llhgp2l4okfe8p5ocd3ies84wrt9rs82y4xdc69nlmm0rc58"
          onEditorChange={(content, editor) => {
            handleChange(content, "descriptionJP");
          }}
          value={data?.descriptionJP}
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
          <button onClick={handleSubmit} className="btn-edit">
          {dictionary["Save change"]}
          </button>
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

export default Edit;
