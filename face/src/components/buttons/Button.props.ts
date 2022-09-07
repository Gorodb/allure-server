import {ButtonHTMLAttributes, ReactNode, RefObject} from "react";
import {ButtonTypesEnum} from "../../enums/buttonTypes.enum";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: any;
  buttonType?: ButtonTypesEnum;
  children?: ReactNode;
  buttonRef?: RefObject<HTMLButtonElement>;
}
