import {DetailedHTMLProps, HTMLAttributes} from "react";
import {IProjectInfo} from "../../types/project.types";
import {IReport} from "../../types/reports.types";
import {IModal} from "../../types/modal.types";

export interface ProjectProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  report: IReport,
}
