import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Col, Row } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RootState } from "@/store/reducer";
import { Locale } from "@/util/constanst";
import { CurrentUser } from "@/store/login/type";
import InputError from "./component/InputError";
const SelectCategory = dynamic(() => import("./component/SelectCategory"));
const Checkbox = dynamic(() => import("./component/Checkbox"), {
  ssr: false,
});

const Info = ({
  lang,
  dictionary,
  formikBag,
}: {
  lang: Locale;
  dictionary: { [key: string]: string };
  formikBag: any;
}) => {
  const user: CurrentUser = useSelector(
    (state: RootState) => state.auth.currentUser
  );

  const [isCountry, setIsCoutry] = useState<number>();
  const [checkboxValue, setCheckboxValue] = useState<string[]>([]);

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      formikBag.setFieldValue(`info[0].company_logo`, file);
      formikBag.setFieldValue(`info[0].preview`, URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!!e.target.checked) {
      setCheckboxValue([...checkboxValue, value]);
    } else {
      let index = checkboxValue.indexOf(value);
      checkboxValue.splice(index, 1);
      setCheckboxValue(checkboxValue);
    }
  };

  useEffect(() => {
    formikBag.setValues({
      ...formikBag.values,
      info: [
        {
          ...formikBag.values.info[0],
          languages: JSON.stringify(checkboxValue),
        },
      ],
    });
  }, [checkboxValue]);

  useEffect(() => {
    if (user.country === "Japan") {
      setCheckboxValue(["japan"]);
      setIsCoutry(1);
    } else if (user.country === "Viet Nam") {
      setCheckboxValue(["vietnam"]);
      setIsCoutry(2);
    }
  }, [user?.country]);

  return (
    <div className="member__main_info">
      <div className="member__description_title">
        <h4>{dictionary["Company information"]}</h4>
      </div>
      <Row>
        <Col span={12} xl={12} lg={12} md={24} xs={24}>
          <div className="member__main_info_item">
            <h5>{dictionary["Company Name (Vietnamese)"]}</h5>
            <input
              name="company_name"
              defaultValue={user.company_name}
              className="company_name"
              disabled
            />
          </div>
          <div className="member__main_info_item">
            <h5>{dictionary["Company Name (English)"]}</h5>
            <input
              name="company_name_en"
              defaultValue={user.company_name_en}
              className="company_name"
              disabled
            />
          </div>
          <div className="member__main_info_item">
            <h5>{dictionary["Company Name (Japan)"]}</h5>
            <input
              name="company_name_jp"
              defaultValue={user.company_name_jp}
              className="company_name"
              disabled
            />
          </div>
        </Col>
        <Col span={12} xl={12} lg={12} md={24} xs={24}>
          <div className="member__main_info_item">
            <h5>{dictionary["Company's Logo"]}</h5>
            <label htmlFor="image">
              {dictionary["Preferred: ( .jpg, .jpeg, .png)"]}
            </label>
            <Row align={"middle"}>
              <label htmlFor="image" className="custom-file-upload">
                <UploadOutlined />
                <input
                  onChange={handleChangeImage}
                  id="image"
                  type="file"
                  name="company_logo"
                  accept=".png, .jpeg, .jpg"
                />
              </label>
              <label htmlFor="image">{dictionary["Choose File"]}</label>
            </Row>
            <Image
              src={formikBag.values.info[0].preview}
              style={{ objectFit: "contain" }}
              width={200}
              height={100}
              alt="company-logo"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xl={12} lg={12} md={24} xs={24}>
          <div className="member__main_info_item">
            <h5>
              {dictionary["Years Of Establishment"]}
              <span className="required">* </span>
            </h5>
            <InputError formikBag={formikBag} item={"estalishment"} />
          </div>
          <div className="member__main_info_item">
            <h5>
              {dictionary["Number Of Employees"]}
              <span className="required">* </span>
            </h5>
            <InputError formikBag={formikBag} item={"employers"} />
          </div>
          <div className="member__main_info_item">
            <h5>{dictionary["Request (Vietnamese)"]}</h5>
            <textarea {...formikBag.getFieldProps("info[0].needs_vn")} />
            <h5>{dictionary["Request (English)"]}</h5>
            <textarea {...formikBag.getFieldProps("info[0].needs_en")} />
            <h5>{dictionary["Request (Japanese)"]}</h5>
            <textarea {...formikBag.getFieldProps("info[0].needs_jp")} />
          </div>
          <div className="member__main_info_item">
            <h5>
              {dictionary["Language Can Work"]}
              <span className="required">* </span>
            </h5>
            <Checkbox
              user={user}
              setCheckboxValue={setCheckboxValue}
              setIsCoutry={setIsCoutry}
              isCountry={isCountry}
              handleChange={handleChange}
              dictionary={dictionary}
            />
          </div>
        </Col>
        <Col xl={12} lg={12} md={24} xs={24}>
          <div className="member__main_info_item">
            <h5>
              {dictionary["Type Of Business"]}
              <span className="required">* </span>
            </h5>

            <SelectCategory formikBag={formikBag} lang={lang} />
          </div>
          <div className="member__main_info_item">
            <h5>
              {dictionary["Company Capital Amount"]}
              <span className="required">* </span>
            </h5>
            <InputError formikBag={formikBag} item={"capital"} />
          </div>
          <div className="member__main_info_item">
            <h5>{dictionary["Address (Vietnamese)"]}</h5>
            <textarea {...formikBag.getFieldProps("info[0].address_vn")} />
            <h5>{dictionary["Address (English)"]}</h5>
            <textarea {...formikBag.getFieldProps("info[0].address_en")} />
            <h5>{dictionary["Address (Japanese)"]}</h5>
            <textarea {...formikBag.getFieldProps("info[0].address_jp")} />
          </div>
          <div className="member__main_info_item">
            <h5>{dictionary["Link Website"]}</h5>
            <input
              {...formikBag.getFieldProps("info[0].info_url")}
              className="company_name"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Info;
