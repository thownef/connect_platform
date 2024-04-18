import { Modal } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import "../index.scss"

const ModalContact = ({
  isOpen,
  setOpen,
  handleReset,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleReset: () => void;
}) => {
  const handleClick = () => {
    setOpen(false);
    handleReset()
  };
  return (
    <Modal
      centered
      closable={false}
      footer={null}
      open={isOpen}
      style={{
        maxWidth: 800,
      }}
      className="model-handle-form"
    >
      <div className="model-popup-success">
        <div className="model-popup-success-top">
          <div className="model-popup-success-top-folder">
            <div className="model-popup-success-button">
              <div className="model-popup-success-button-cover">
                <CheckOutlined className="icon-popup-contact" />
              </div>
            </div>
          </div>
        </div>
        <div className="model-popup-success-content">
          <span>Send success!</span>
        </div>
        <div className="model-popup-success-bottom">
          <button onClick={handleClick}>OK</button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalContact;
