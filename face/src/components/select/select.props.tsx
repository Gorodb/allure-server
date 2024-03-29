import {ReactNode, SelectHTMLAttributes} from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children?: ReactNode;
  label?: string;
  className?: string;
  onClear?: (...args: any[]) => void;
  defaultOptionText?: string;
  isRequired?: boolean;
  requiredText?: string;
}
