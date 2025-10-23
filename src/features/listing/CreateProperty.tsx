import { useState } from "react";
import Modal from "../../components/Modal";
import { Edit2, HousePlus } from "lucide-react";
import MultiStepForm from "./MultiStepForm"; // ✅ match actual component name
import Illustrator from "../../components/Illustrator";
import type { PropertyItem } from "../../types/space";

interface CreateSpaceProp {
  type?: "edit" | "new";
  space?: PropertyItem;
}

function CreateProperty({ type = "new", space }: CreateSpaceProp) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<number>(0);

  return (
    <>
      {type === "new" && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Add New Space"
          className="
            fixed bottom-6 right-6
            bg-amber-400 hover:bg-amber-500 active:bg-amber-600
            text-white p-4 rounded-full shadow-xl
            flex items-center justify-center
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-amber-300
            z-50
          "
        >
          <HousePlus size={24} />
        </button>
      )}

      {type === "edit" && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          <Edit2 size={14} /> Edit
        </button>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={type === "edit" ? "Edit Space" : "New Space"}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 h-full w-full">
          <div className="p-6 h-full w-full rounded-lg text-gray-400 text-sm flex items-center justify-center">
            <div className="w-50 sm:w-70">
              <Illustrator src={`./${step}List.svg`} />
            </div>
          </div>

          <div className="overflow-auto p-6">
            <MultiStepForm getStep={setStep} space={space} />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CreateProperty;
