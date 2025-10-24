import React, { useState, useEffect } from "react";
import steps from "./steps";
import BasicInfo from "./BasicInfo";
import PricingAndAvailability from "./PricingAndAvailability";
import AddressAndLocation from "./AddressAndLocation";
import SpaceProfile from "./SpaceProfile";
import AgentInfo from "./AgentInfo";
import Location from "./Location";
import Media from "./Media";
import { defaultSpaceFormState, type SpaceFormState } from "./spaceState";
import { useSpace } from "../../hooks/useSpaceHook";
import type { PropertyItem } from "../../types/space";
import { mapSpaceToFormState } from "./convertToEditFromView";
import { Loader } from "../../components/Loader";
import Error from "../../components/Error";
import { convertToBackendStructure } from "./toBackendStructure";

interface MultiStepFormProps {
  getStep?: (currentStep: number) => void;
  space?: PropertyItem | null;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  getStep,
  space = null,
}) => {
  const { loading, error, createSpace, updateSpace } = useSpace();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<SpaceFormState>(
    defaultSpaceFormState
  );

  useEffect(() => {
    if (space) {
      setFormData(mapSpaceToFormState(space));
    }
  }, [space]);

  useEffect(() => {
    if (getStep) getStep(step);
  }, [step, getStep]);

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!space) {
      createSpace(formData);
    } else {
      const { price, ...rest } = formData;
      const merged = { ...rest, ...price };
      const readyForBackend = convertToBackendStructure(merged);
      updateSpace(space.id || "", readyForBackend);
    }
  };

  if (loading && !error) {
    return (
      <div className="w-full h-full">
        <Loader />
      </div>
    );
  }
  if (!loading && error) {
    return (
      <div className="w-full h-full">
        <Error />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-around items-center overflow-auto">
      <form>
        <div>
          {step === 0 && (
            <BasicInfo formData={formData} setFormData={setFormData} />
          )}
          {step === 1 && (
            <PricingAndAvailability
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 2 && (
            <AddressAndLocation formData={formData} setFormData={setFormData} />
          )}
          {step === 3 && (
            <Location formData={formData} setFormData={setFormData} />
          )}
          {step === 4 && (
            <SpaceProfile formData={formData} setFormData={setFormData} />
          )}
          {step === 5 && (
            <Media formData={formData} setFormData={setFormData} />
          )}
          {step === 6 && (
            <AgentInfo formData={formData} setFormData={setFormData} />
          )}
        </div>

        <div className="flex justify-between mt-4">
          {step > 0 && (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Back
            </button>
          )}

          {step < steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
