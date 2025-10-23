import React from "react";
import { ImagePlus } from "lucide-react";
import type { SpaceFormState } from "./spaceState";

interface MediaProps {
  formData: SpaceFormState;
  setFormData: React.Dispatch<React.SetStateAction<SpaceFormState>>;
}

const Media: React.FC<MediaProps> = ({ formData, setFormData }) => {
  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const validFiles: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        alert(`File ${file.name} is not a supported image type.`);
        continue;
      }
      if (file.size > 3 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 5MB limit.`);
        continue;
      }
      // Use local URL for preview, can convert to base64 or upload later
      validFiles.push(URL.createObjectURL(file));
    }

    setFormData((prev) => ({
      ...prev,
      space_profile: {
        ...prev.space_profile,
        photos: [...prev.space_profile.photos, ...validFiles],
      },
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Images</h2>
        <p className="text-gray-600 text-sm">
          Upload images of the space (JPG, PNG, max 5MB each).
        </p>
      </div>

      {/* Upload Section */}
      <label className="block border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:border-blue-400 transition-colors duration-200">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <ImagePlus className="w-10 h-10 text-gray-400" />
          <p className="text-sm">Click or drag files to upload</p>
          <p className="text-xs text-gray-400">
            Supported: JPG, PNG | Max: 5MB
          </p>
        </div>
        <input
          type="file"
          multiple
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </label>

      {/* Image Previews */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {formData.space_profile.photos.map((src, idx) => (
          <div
            key={idx}
            className="relative border rounded-md overflow-hidden bg-gray-100 h-32 flex items-center justify-center"
          >
            <img
              src={src}
              alt={`preview-${idx}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
        {formData.space_profile.photos.length === 0 && (
          <div className="relative border rounded-md overflow-hidden bg-gray-100 h-32 flex items-center justify-center text-gray-400">
            <ImagePlus className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Media;
