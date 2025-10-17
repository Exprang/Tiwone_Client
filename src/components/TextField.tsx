import type React from "react";
import IconInput from "./InputField";
import { Mail, MailIcon } from "lucide-react";

type ChangeEvents =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;
interface BaseProps {
  textType?: "input" | "textarea";
  onChange?: (e: ChangeEvents) => void;
}
type TextFieldProps = BaseProps &
  (
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.TextareaHTMLAttributes<HTMLTextAreaElement>
  );
function TextField({ textType = "input", onChange, ...rest }: TextFieldProps) {
  if (textType === "textarea") {
    return (
      <textarea
        {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        onChange={onChange}
      />
    );
  }
  return (
    // <input

    // />
    <IconInput
      {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
      // onChange={onChange}
      onChange={onChange}
      icon={<MailIcon />}
      placeholder="Email"
    />
  );
}

export default TextField;
