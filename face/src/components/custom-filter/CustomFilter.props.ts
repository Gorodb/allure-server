import {DetailedHTMLProps, HTMLAttributes} from "react";
import {IReport} from "../../types/reports.types";

export interface CustomFilterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  filtered: IReport[];
  filterItems: string[];
  filterFunction: (args: string) => any;
  clearFilter: () => void;
  defaultText?: string;
}
