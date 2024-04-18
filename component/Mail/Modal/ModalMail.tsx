import { Modal } from "antd";

const ModalMail = ({
  content,
  isOpen,
  setOpen,
}: {
  content: string;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
	  maskClosable={false}
      footer={null}
      centered
      className="model-contact-show"
    >
      <div className="form-contact-handle">
        <div>
          <div className="model-contact-content">
            <div className="model-contact-content-column">
              <span>{content}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalMail;
