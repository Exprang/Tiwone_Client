import { useState } from "react";
import Modal from "../../components/Modal";
import { Expand } from "lucide-react";
import type { PropertyItem } from "../../types/space";

function ViewFinder({ space }: { space: PropertyItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 hover:bg-gray-700 transition-all duration-200"
      >
        <Expand className="w-5 h-5" />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={space.name}
      >
        <div className="w-full h-full flex justify-around items-center">
          Comming soon
        </div>
      </Modal>
    </>
  );
}

export default ViewFinder;
