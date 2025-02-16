import Button from "./Button";

interface Props {
  title: string;
  showModal: boolean;
  onClose: () => void;
  buttons: {
    textContent: string;
    className: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }[];
}

const Modal = ({ title, showModal, onClose, buttons }: Props) => {
  return (
    showModal && (
      <div className="position-fixed top-0 start-0 w-100 vh-100 z-3">
        <div
          onClick={onClose}
          className="position-fixed top-0 start-0 w-100 vh-100 bg-dark bg-opacity-50"
        />
        <dialog
          open
          className="position-absolute top-50 bottom-50 border rounded"
        >
          <h2 className="fs-5">{title}</h2>
          <div className="d-flex justify-content-center gap-4 mt-4 ">
            {buttons.map((button, index) => (
              <Button
                key={index}
                className={button.className}
                onClick={button.onClick ?? onClose}
              >
                {button.textContent}
              </Button>
            ))}
          </div>
        </dialog>
      </div>
    )
  );
};

export default Modal;
