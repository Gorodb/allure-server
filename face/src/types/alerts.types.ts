import {AlertTypesEnum} from "../enums/alerts.enum";

export interface IAlert {
  id: number;
  text: string;
  type: AlertTypesEnum;
}