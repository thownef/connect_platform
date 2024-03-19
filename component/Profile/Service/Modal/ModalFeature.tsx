import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Col, Form, Modal, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ImageFeature from "../../../../public/images/data-not-found.png";
import { CompanyFeature } from "@/store/profile/type";
import {
  createCompanyFeature,
  getCompanyFeature,
  updateCompanyFeature,
} from "@/store/callApi";
import { STATUS_CODE } from "@/util/constanst";
import { endLoading, startLoading } from "@/store/loading/action";
import { removeImage, upload } from "@/helper";
import { getProfileCompany } from "@/store/profile/action";

const ModalFeature = ({
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
    speciality_picture: "",
    speciality_desc: "",
    speciality_desc_en: "",
    speciality_desc_jp: "",
  };

  const [preview, setPreview] = useState<any>(ImageFeature);
  const [picture, setPicture] = useState<File | undefined>(undefined);
  const [data, setData] = useState<CompanyFeature>(defaultData);
  const handleClose = () => {
    setOpen(false);
    setEdit(0);
    setData(defaultData);
    setPreview(ImageFeature);
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

  const getData = async (id: number | string) => {
    try {
      if (id) {
        const res = await getCompanyFeature(id);
        if (res && res.status === STATUS_CODE.SUCCESS) {
          setData(res.data.data);
          if (res.data.data.speciality_picture) {
            setPreview(res.data.data.speciality_picture);
          } else {
            setPreview(ImageFeature);
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
          newData = { ...newData, speciality_picture: imgUrl };
        }
        const res = await createCompanyFeature(newData);
        if (res?.status === STATUS_CODE.SUCCESS) {
          success(res.data.message);
        } else {
          error(res?.data.message);
        }
      } else {
        if (picture) {
          const imgUrl = await upload(picture, Number(slug));
          if (data.speciality_picture) {
            await removeImage(data.speciality_picture);
          }
          newData = { ...newData, speciality_picture: imgUrl };
        }

        const res = await updateCompanyFeature(newData, id);
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
        <span>{!id ? dictionary["Create company feature"] : dictionary["Edit feature information"]}</span>
      </div>
      <hr />
      <Row>
        <Col span={12}>
          <Form>
            <Form.Item className="item-design">
              <div>
                <div className="label-title">
                  <label>
                    {dictionary["Feature Description (Vietnamese)"]}
                  </label>
                </div>
                <div className="label-info-company">
                  <input
                    value={data.speciality_desc}
                    onChange={handleChange}
                    name="speciality_desc"
                    className="info-input"
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item className="item-design">
              <div>
                <div className="label-title">
                  <label>{dictionary["Feature Description (English)"]}</label>
                </div>
                <div className="label-info-company">
                  <input
                    value={data.speciality_desc_en}
                    onChange={handleChange}
                    name="speciality_desc_en"
                    className="info-input"
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item className="item-design">
              <div>
                <div className="label-title">
                  <label>{dictionary["Feature Description (Japanese)"]}</label>
                </div>
                <div className="label-info-company">
                  <input
                    value={data.speciality_desc_jp}
                    onChange={handleChange}
                    name="speciality_desc_jp"
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
                <label htmlFor="image-feature">
                  <Image
                    id="preview-image"
                    src={preview}
                    alt="avatar"
                    width={250}
                    height={180}
                  />
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label htmlFor="image-feature" className="custom-file-upload">
                    <UploadOutlined style={{ marginLeft: 8 }} />
                    <input
                      onChange={handleChangeImage}
                      id="image-feature"
                      type="file"
                      name="image"
                      accept=".png, .jpeg, .jpg"
                    />
                  </label>
                  <label htmlFor="image-feature">{dictionary["Choose File"]}</label>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
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

export default ModalFeature;
