import {ChangeEvent, InputHTMLAttributes, RefObject} from "react";

export interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  inputRef?: RefObject<HTMLInputElement>;
  value?: string;
}
