import {ReportsTypesEnum} from "../enums/reportsTypes.enum";

export interface IStatistic {
  failed: number;
  broken: number;
  skipped: number;
  passed: number;
  unknown?: number;
  total: number;
}

export interface ITime {
  start: number;
  stop: number;
  duration: number;
  minDuration: number;
  maxDuration: number;
  sumDuration: number;
}

export interface IReport {
  reportName?: string;
  testRuns?: any[];
  statistic?: IStatistic;
  time?: ITime;
  project: string;
  _id: string;
  platform: string;
  lastUpdate?: number;
  type: ReportsTypesEnum,
  entrypoint?: string;
  hasReports: boolean;
  description: string;
}

export interface IProjectOnEdit {
  description: string;
  platform: string;
  project: string;
  type: ReportsTypesEnum,
  entrypoint?: string;
}

export interface IReports {
  reports: IReport[];
}

export interface ICreateProjectBody {
  "project": string;
  "description": string;
  "platform": string;
  "type": ReportsTypesEnum;
  entrypoint?: string;
}

export interface ICreateProjectResponse {
  "project": string;
  "description": string;
  "platform": string;
  "type": ReportsTypesEnum;
  "entrypoint"?: string;
  "lastUpdate": number;
  "_id": string
}

export interface IRemoveProjectBody {
  "project": string
}

export interface IRemoveProjectResponse {
  "success": boolean
}

export interface IUploadReportBody {
  "name": string,
  "file": File
}

export interface IUploadReportResponse {
  "success": boolean
}