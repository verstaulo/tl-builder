import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  className?: string;
  children: ReactNode;
  onClose?: () => void;
}

const Modal = ({ onClose, className, children }: ModalProps) => {
  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (onClose) {
      onClose();
    } else return;
  };

  return createPortal(
    <div
      className={
        "fixed top-0 lef-0 z-[99] h-screen w-screen overflow-auto p-4 " +
        (className ? className : "")
      }
      onClick={clickHandler}
    >
      {children ? children : null}
    </div>,
    document.querySelector<HTMLDivElement>("#portal")!
  );
};

export default Modal;
