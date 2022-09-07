import {DetailedHTMLProps, HTMLAttributes} from "react";
import {IProjectOnEdit} from "../../types/reports.types";

export interface EditProjectProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  report: IProjectOnEdit;
}
