import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";

function DescriptionField() {
  const [description, setDescription] = useState("");

  const handleAIInsert = () => {
    // Simulate AI-generated description
    const aiText =
      "Spacious and modern office space with natural light, high-speed internet, and a prime location.";
    setDescription((prev) => (prev ? `${prev} ${aiText}` : aiText));
  };

  return (
    <div className="relative">
      <FileText className="absolute left-3 top-3 text-gray-500 w-5 h-5" />

      <textarea
        name="description"
        placeholder="Describe your space or let AI assist..."
        rows={5}
        className="w-full pl-10 pr-16 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        type="button"
        onClick={handleAIInsert}
        className="absolute right-2 top-2 flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded-sm hover:bg-blue-700 transition-all"
        aria-label="AI-generated description"
      >
        <Sparkles className="w-4 h-4" />
        AI
      </button>
    </div>
  );
}

export default DescriptionField;
