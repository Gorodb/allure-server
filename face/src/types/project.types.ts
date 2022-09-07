import {ReportsTypesEnum} from "../enums/reportsTypes.enum";

export interface IProjectInfo {
  description: string;
  project: string;
  platform: string;
  type: ReportsTypesEnum;
  entrypoint?: string;
}
