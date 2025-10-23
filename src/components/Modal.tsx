import { HousePlus, X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children, footer }: ModalProps) => {
  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex justify-center items-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="
          bg-white
          w-full h-full
          relative
          transform transition-all duration-300 ease-out
          scale-100 opacity-100
          flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="text-lg font-semibold flex justify-between items-center py-5 px-6">
            <span className="flex gap-2">
              <HousePlus />
              {title}
            </span>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 font-bold"
              aria-label="Close modal"
            >
              <X color="red" size={30} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-auto ">{children}</div>

        {/* Footer */}
        {footer && <div className="mt-4 border-t pt-2">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
