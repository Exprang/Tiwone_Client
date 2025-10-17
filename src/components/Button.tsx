import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children = "Submit",
  variant = "primary",
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 rounded-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles =
    variant === "primary"
      ? "bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500"
      : "bg-gray-300 text-black hover:bg-gray-400 focus:ring-gray-400";

  // Allow overrides — consumer styles take precedence
  const combinedClasses = `${baseStyles} ${variantStyles} ${className ?? ""}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
