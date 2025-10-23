import React, { useState } from "react";
import {
  Building,
  DollarSign,
  MapPin,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const steps = [
  { id: 1, title: "Basic Info", icon: Building },
  { id: 2, title: "Pricing", icon: DollarSign },
  { id: 3, title: "Location", icon: MapPin },
  { id: 4, title: "Description", icon: FileText },
  { id: 5, title: "Review & Submit", icon: CheckCircle2 },
];

function CreatePropertyWizard() {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white rounded-2xl shadow-lg mt-10 border border-gray-100">
      {/* Progress Indicator */}
      <div className="relative flex justify-between items-center mb-10">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10" />
        {steps.map((s, i) => {
          const Icon = s.icon;
          const isActive = step === s.id;
          const isCompleted = step > s.id;
          return (
            <div key={s.id} className="flex flex-col items-center flex-1">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? "bg-blue-600 border-blue-600 text-white"
                    : isActive
                    ? "border-blue-600 text-blue-600 bg-white"
                    : "border-gray-300 text-gray-400 bg-white"
                }`}
              >
                <Icon size={18} />
              </div>
              <span
                className={`mt-2 text-xs sm:text-sm ${
                  isActive || isCompleted ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {s.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[250px] transition-all">
        {step === 1 && (
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              Basic Information
            </h2>
            <p className="text-gray-500 text-sm">
              Define your property’s identity — name, type, and purpose.
            </p>
          </div>
        )}
        {step === 2 && (
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              Pricing Details
            </h2>
            <p className="text-gray-500 text-sm">
              Set competitive pricing based on your preferred deal type.
            </p>
          </div>
        )}
        {step === 3 && (
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              Location Information
            </h2>
            <p className="text-gray-500 text-sm">
              Add precise details to help clients locate the property.
            </p>
          </div>
        )}
        {step === 4 && (
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              Description & Media
            </h2>
            <p className="text-gray-500 text-sm">
              Share your property’s story with visuals and highlights.
            </p>
          </div>
        )}
        {step === 5 && (
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              Review & Submit
            </h2>
            <p className="text-gray-500 text-sm">
              Confirm your details before publishing your listing.
            </p>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mt-8">
        <button
          disabled={step === 1}
          onClick={prevStep}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg transition ${
            step === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
          }`}
        >
          <ChevronLeft size={18} /> Back
        </button>

        {step < steps.length ? (
          <button
            onClick={nextStep}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Next <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={() => alert("Property created successfully!")}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <CheckCircle2 size={18} /> Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default CreatePropertyWizard;
