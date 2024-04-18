import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Col, Modal, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import ImageDefault from "../../../../public/images/data-not-found.png";
import { CompanyCustomer } from "@/store/profile/type";
import {
  createCompanyCustomer,
  getCompanyCustomer,
  updateCompanyCustomer,
} from "@/store/callApi";
import { STATUS_CODE } from "@/util/constanst";
import { endLoading, startLoading } from "@/store/loading/action";
import { removeImage, upload } from "@/helper";
import { getProfileCompany } from "@/store/profile/action";
import { customerSchema } from "./validation";

const ModalCustomer = ({
  isOpen,
  setOpen,
  id,
  setEdit,
  success,
  error,
  dictionary,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string | number;
  setEdit: React.Dispatch<React.SetStateAction<string | number>>;
  success: (message: string) => void;
  error: (message: string) => void;
  dictionary: { [key: string]: string };
}) => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const defaultData = {
    id: "",
    user_id: Number(slug),
    email: "",
    client_name: "",
    client_logo: "",
    client_url: "",
    client_url_EN: "",
    client_url_JP: "",
  };

  const [preview, setPreview] = useState<any>(ImageDefault);
  const [picture, setPicture] = useState<File | undefined>(undefined);
  const [data, setData] = useState<CompanyCustomer>(defaultData);

  const handleClose = () => {
    setOpen(false);
    setEdit(-1);
    setPreview(ImageDefault);
    setPicture(undefined);
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPicture(file);
      setPreview(URL.createObjectURL(file));
      formikBag.setFieldValue("client_logo", file);
    }
  };

  const getData = async (id: string | number) => {
    try {
      if (id) {
        const res = await getCompanyCustomer(id);
        if (res && res.status === STATUS_CODE.SUCCESS) {
          setData(res.data.data);
          formikBag.setValues(res.data.data);
          if (res.data.data.client_logo) {
            setPreview(res.data.data.client_logo);
          } else {
            setPreview(ImageDefault);
          }
        }
      }
    } catch (err) {}
  };

  const handleSubmit = async (values: CompanyCustomer) => {
    dispatch(startLoading());
    let newData = { ...values };
    if (picture) {
      const imgUrl = await upload(picture, Number(slug));
      newData = { ...newData, client_logo: imgUrl };
    }
    try {
      if (!id) {
        const res = await createCompanyCustomer(newData);
        if (res?.status === STATUS_CODE.SUCCESS) {
          success(res.data.message);
        } else {
          error(res?.data.message);
        }
      } else {
        if (data.client_logo) {
          await removeImage(data.client_logo);
        }

        const res = await updateCompanyCustomer(newData, id);
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

  const formikBag = useFormik({
    initialValues: data,
    validationSchema: customerSchema(dictionary),
    onSubmit: async (values: CompanyCustomer) => handleSubmit(values),
  });

  useEffect(() => {
    formikBag.resetForm();
    formikBag.setErrors({
      client_name: "",
      client_logo: "",
    });
    if (id && Number(id) > 0) {
      getData(id);
    }
  }, [id]);
  return (
    <Modal
      open={isOpen}
      closable={false}
      footer={null}
      style={{
        maxWidth: 800,
      }}
      centered
    >
      <div className="model-title">
        <span>{dictionary["Create Customer Company"]}</span>
      </div>
      <hr />
      <form onSubmit={formikBag.handleSubmit}>
        <Row>
          <Row gutter={[16, 16]}>
            <Col span={12} xl={12} lg={12} md={24} xs={24}>
              <div>
                <div className="label-title">
                  <label>{dictionary["Client Company Name"]}</label>
                </div>
                <div className="label-info-company">
                  <input
                    {...formikBag.getFieldProps("client_name")}
                    className="info-input"
                    type="text"
                  />
                </div>
                {formikBag.errors.client_name &&
                  formikBag.touched.client_name && (
                    <span className="error_input">
                      {formikBag.errors.client_name}
                    </span>
                  )}
              </div>
            </Col>
            <Col span={12} xl={12} lg={12} md={24} xs={24}>
              <label htmlFor="image-customer">
                <Image
                  className="core__img"
                  id="preview-image"
                  src={preview}
                  alt="avatar"
                  width={100}
                  height={100}
                />
              </label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <label htmlFor="image-customer" className="custom-file-upload">
                  <UploadOutlined style={{ marginLeft: 2 }} />
                  <input
                    onChange={handleChangeImage}
                    id="image-customer"
                    type="file"
                    accept=".png, .jpeg, .jpg"
                  />
                </label>
                <label htmlFor="image-customer">{dictionary["Choose File"]}</label>
              </div>
              {formikBag.errors.client_logo &&
                formikBag.touched.client_logo && (
                  <span className="error_input">
                    {formikBag.errors.client_logo}
                  </span>
                )}
            </Col>
            <Col span={8} xl={8} lg={8} md={24} xs={24}>
              <div>
                <div className="label-title">
                  <label>{dictionary["URL (Viet Nam)"]}</label>
                </div>
                <div className="label-info-company">
                  <input
                    {...formikBag.getFieldProps("client_url")}
                    className="info-input"
                    type="text"
                  />
                </div>
              </div>
            </Col>
            <Col span={8} xl={8} lg={8} md={24} xs={24}>
              <div>
                <div className="label-title">
                  <label>{dictionary["URL (English)"]}</label>
                </div>
                <div className="label-info-company">
                  <input
                    {...formikBag.getFieldProps("client_url_EN")}
                    className="info-input"
                    type="text"
                  />
                </div>
              </div>
            </Col>
            <Col span={8} xl={8} lg={8} md={24} xs={24}>
              <div>
                <div className="label-title">
                  <label>{dictionary["URL (Japan)"]}</label>
                </div>
                <div className="label-info-company">
                  <input
                    {...formikBag.getFieldProps("client_url_JP")}
                    className="info-input"
                    type="text"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Row>
        <div className="form-info-btn">
          <div className="btn-edit-company">
            <button type="submit" className="btn-edit">
            {dictionary["Save change"]}
            </button>
          </div>
          <div className="btn-edit-company">
            <button type="button" onClick={handleClose} className="btn-cancel">
            {dictionary["Close"]}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalCustomer;
