import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div
          // onClick={onClose}
          className="absolute top-0 z-120 grid h-screen w-screen place-items-center backdrop-blur"
        >
          <div className="relative z-150 m-auto min-h-[200px] min-w-[370px] bg-white p-4">
            <div className="flex justify-end">
              <AiOutlineClose onClick={onClose} className="self-end text-2xl" />
            </div>
            {children}
          </div>
          {/* <div className="absolute top-0 z-120 h-screen w-screen backdrop-blur" /> */}
        </div>
      )}
    </>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
