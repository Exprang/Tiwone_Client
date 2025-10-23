import React from "react";

interface IllustratorProps {
  src: string; // path to the svg file
  alt?: string;
  width?: string;
  height?: string;
  className?: string;
}

const Illustrator: React.FC<IllustratorProps> = ({
  src,
  alt = "illustration",
  width = "100%",
  height = "auto",
  className = "",
}) => {
  return (
    <div
      className={`flex justify-center items-center ${className}`}
      style={{ width, height }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="object-contain max-w-full max-h-full"
      />
    </div>
  );
};

export default Illustrator;
