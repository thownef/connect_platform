"use client";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import "./index.scss";
import { SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { registerFail } from "@/store/register/action";
const ModalSuccess = ({
  isOpen,
  formLayout,
  dictionary,
  lang,
  setOpen
}: {
  isOpen: boolean;
  formLayout: string;
  dictionary: { [key: string]: string };
  lang: string;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const dispatch = useDispatch()
  const handleChangOk = () => {
    setOpen(false)
    dispatch(registerFail(""))
    router.push(`/${lang}/`);
  };
  return (
    <Modal
      centered
      open={isOpen}
      footer={null}
      closable={false}
      style={{
        maxWidth: formLayout === "inline" ? "none" : 800,
      }}
      className="model-handle-form"
    >
      <div className="model_popup_success">
        <div className="model-popup-success-top">
          <div className="model-popup-success-top-folder">
            <div className="model-popup-success-button">
              <div className="model-popup-success-button-cover">
                <CheckOutlined className="icon-popup-contact" />
              </div>
            </div>
          </div>
        </div>
        <div className={"model_popup_success_content"}>
          <span>
            {
              dictionary[
                "Thank you for registering an account on the VJP Connect platform."
              ]
            }
          </span>
        </div>
        <div className={"model_popup_success_content_ha"}>
          <span>
            {
              dictionary[
                "We will evaluate and notify you soon via email or registered phone number."
              ]
            }
          </span>
        </div>
        <div className={"model_popup_success_content_ha"}>
          <span> {dictionary["Thank you!"]}</span>
        </div>
        <div className={"model_popup_success_bottom_center"}>
          <button onClick={handleChangOk}>OK</button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSuccess;
