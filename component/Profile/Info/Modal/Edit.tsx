import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Col, Form, Modal, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Locale } from "@/util/constanst";
import { editDataCompanyInfo, fetchDataStart, updateDataCompanyInfo } from "@/store/info/action";
import { RootState } from "@/store/reducer";
import "./index.scss";
import { Category } from "@/store/category/type";
import { startLoading } from "@/store/loading/action";
import { removeImage, upload } from "@/helper";
import ImageDefault from "../../../../public/images/data-not-found.png";
import { CurrentUser } from "@/store/login/type";

const Edit = ({
  isOpen,
  setOpen,
  id,
  lang,
  success,
  error,
  dictionary,
}: {
  isOpen: boolean;
  setOpen: any;
  id: string | number;
  lang: Locale;
  success: (message: string) => void;
  error: (message: string) => void;
  dictionary: { [key: string]: string };
}) => {
  const dispatch = useDispatch();
  const companyInfo = useSelector(
    (state: RootState) => state.info?.companyInfo
  );
  const user: CurrentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  );

  const languages = companyInfo?.languages
  const allCategory: Category[] = useSelector(
    (state: RootState) => state.category
  );
  const [companyLogo, setCompanyLogo] = useState('');
  const [preview, setPreview] = useState<any>(ImageDefault)
  const [value, setValue] = useState();
  const [category, setCategory] = useState<string>();
  const handleCheckboxChange = (checkedValues: any) => {
    setValue(checkedValues);
  };
  const handleCancel = () => {
    setOpen(false);
    if (companyInfo && companyInfo?.company_logo) {
      setPreview(companyInfo.company_logo);
    } else {
      setPreview(ImageDefault)
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    dispatch(editDataCompanyInfo({ ...companyInfo, [name]: value }));
  };

  const handleChangeImage = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyLogo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    dispatch(startLoading())
    let data = { ...companyInfo, languages: JSON.stringify(value), category: category }
    if (companyLogo) {
      const imgUrl = await upload(companyLogo, id);
      await removeImage(companyInfo.company_logo)
      data = ({ ...data, company_logo: imgUrl });
    } 
    try {
      await dispatch(updateDataCompanyInfo(data, data.id, success, error))
    } finally {
      handleCancel()
    }
  };

  useEffect(() => {
    if (languages) {
      setValue(languages);
    }
  }, [languages]);

  useEffect(() => {
    if (companyInfo && companyInfo?.company_logo) {
      setPreview(companyInfo.company_logo);
    } else {
      setPreview(ImageDefault)
    }
  }, [companyInfo?.company_logo]);

  useEffect(()=>{
    if(companyInfo && companyInfo?.category) {
      setCategory(companyInfo?.category)
    }
  },[companyInfo?.category])

  useEffect(() => {
    dispatch(fetchDataStart(id));
  }, []);

  return (
    <Modal
      style={{
        maxWidth: 1200,
        width: "auto",
      }}
      open={isOpen}
      closable={false}
      footer={null}
    >
      <div className="model-title">
        <span>form info</span>
      </div>
      <hr />
      {companyInfo && <Row>
        <Col sm={12} xs={24}>
          <div className="layout-content">
            <div>
              <div className="label-title">
                <label>{dictionary["Company Name (Vietnamese)"]}</label>
              </div>
              <div className="label-info-company">
                <input
                  className="info-input"
                  name="company_name"
                  value={companyInfo.company_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="label-title">
                <label>{dictionary["Company Name (English)"]}</label>
              </div>
              <div className="label-info-company">
                <input
                  className="info-input"
                  name="company_name_en"
                  value={companyInfo.company_name_en}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="label-title">
                <label>{dictionary["Company Name (Japan)"]}</label>
              </div>
              <div className="label-info-company">
                <input
                  className="info-input"
                  name="company_name_jp"
                  value={companyInfo.company_name_jp}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="label-title">
                <label>{dictionary["Establishment"]}</label>
              </div>
              <div className="label-info-company">
                <input
                  className="info-input"
                  name="estalishment"
                  value={companyInfo.estalishment}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="label-title">
                <label>{dictionary["Employers"]}</label>
              </div>
              <div className="label-info-company">
                <input
                  className="info-input"
                  name="employers"
                  value={companyInfo.employers}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="label-title">
                <label>{dictionary["Request (Vietnamese)"]}</label>
              </div>
              <div className="label-info-company">
                <input
                  className="info-input"
                  name="needs_vn"
                  value={companyInfo.needs_vn}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="label-title">
                <label>{dictionary["Request (English)"]}</label>
              </div>
              <div className="label-info-company">
                <input
                  className="info-input"
                  name="needs_en"
                  value={companyInfo.needs_en}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div className="label-title">
                <label>{dictionary["Request (Japanese)"]}</label>
              </div>
              <div className="label-info-company">
                <input
                  className="info-input"
                  name="needs_jp"
                  value={companyInfo.needs_jp}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Checkbox.Group
              className="item-design"
              value={value}
              onChange={handleCheckboxChange}
            >
              <Checkbox disabled={user?.country === "Viet Nam"} className="btn-radio-expert" value="vietnam">
                Viet Nam
              </Checkbox>
              <Checkbox disabled={user?.country === "Japan"} className="btn-radio-expert" value="japan">
                Japan
              </Checkbox>
              <Checkbox className="btn-radio-expert" value="english">
                English
              </Checkbox>
            </Checkbox.Group>
          </div>
        </Col>
        <Col sm={12} xs={24}>
          <div className="layout-content">
            <div className="layout-info-image">
              <div className="member__main_info_item">
                <h5>{dictionary["Company's Logo"]}</h5>
                <label htmlFor="image-info">
                  {preview && <img
                    id="preview-image"
                    src={preview}
                    alt="avatar"
                    style={{ width: "250px", height: "180px" }}
                  />}
                </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label htmlFor="image-info" className="custom-file-upload">
                    <UploadOutlined style={{ marginLeft: 8 }} />
                    <input
                      onChange={(e) => handleChangeImage(e)}
                      id="image-info"
                      type="file"
                      accept=".png, .jpeg, .jpg"
                    />
                  </label>
                  <label htmlFor="image-info">Choose File</label>
                </div>
                <span className="total-image">
                  {dictionary["Image size with length 600 and width 900!!"]}
                </span>
              </div>
            </div>
          </div>
          <div className="layout-content">
            <Form>
              <div className="">
                <h5 className="title-select">{dictionary["Type Of Business"]}</h5>
                <select
                  name="category"
                  className="select-info"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {allCategory &&
                    allCategory.map((item) => (
                      <option value={item.id} key={item.id}>
                        {lang === "vi" ? (
                          <>{item.name}</>
                        ) : lang === "ja" ? (
                          <>{item.name_jp}</>
                        ) : (
                          <>{item.name_en}</>
                        )}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <div className="label-title">
                  <label>{dictionary["Capital"]}</label>
                </div>
                <div className="label-info-company">
                  <input
                    className="info-input"
                    name="capital"
                    value={companyInfo.capital}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div className="label-title">
                  <label>{dictionary["Address (Vietnamese)"]}</label>
                </div>
                <div className="label-info-company">
                  <input
                    className="info-input"
                    name="address_vn"
                    value={companyInfo.address_vn}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div className="label-title">
                  <label>{dictionary["Address (English)"]}</label>
                </div>
                <div className="label-info-company">
                  <input
                    className="info-input"
                    name="address_en"
                    value={companyInfo.address_en}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div className="label-title">
                  <label>{dictionary["Address (Japanese)"]}</label>
                </div>
                <div className="label-info-company">
                  <input
                    className="info-input"
                    name="address_jp"
                    value={companyInfo.address_jp}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </Form>
          </div>
        </Col>
      </Row>}
      <hr />
      <div className="form-info-btn">
        <div className="btn-edit-company">
          <button onClick={handleSubmit} className="btn-edit">
          {dictionary["Save change"]}
          </button>
        </div>
        <div className="btn-edit-company">
          <button onClick={handleCancel} className="btn-cancel">
          {dictionary["Close"]}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Edit;
