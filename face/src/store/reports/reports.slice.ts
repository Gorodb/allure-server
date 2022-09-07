import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProjectOnEdit, IReport} from "../../types/reports.types";

interface IReportsState {
  reports: IReport[],
  platforms: string[],
  filtered: IReport[],
  currentProject: IProjectOnEdit | null,
  newProject: boolean,
  isUploading: boolean,
}

const initialState: IReportsState = {
  reports: [],
  platforms: [],
  filtered: [],
  currentProject: null,
  newProject: false,
  isUploading: false,
};

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setReportsToState: (state, action: PayloadAction<IReport[]>) => {
      state.reports = action.payload;
    },
    setPlatforms: (state, action: PayloadAction<IReport[]>) => {
      state.platforms = action.payload
        .reduce<string[]>((acc, {platform}) => acc.includes(platform) ? acc : [platform, ...acc], []);
    },
    deleteReport: (state, action: PayloadAction<string>) => {
      state.reports = state.reports.filter(({project}) => {
        return project !== action.payload
      });
    },
    setProjectOnEdit: (state, action: PayloadAction<IProjectOnEdit>) => {
      state.currentProject = state.currentProject = action.payload;
    },
    cancelEditProject: (state) => {
      state.currentProject = null;
    },
    cancelNewProject: (state) => {
      state.newProject = false;
    },
    createNewProject: (state) => {
      state.currentProject = null;
      state.newProject = true;
    },
    updatePlatform: (state, action: PayloadAction<string>) => {
      state.platforms = state.reports.reduce<string[]>((acc, {platform}) => acc.includes(platform) ? acc : [platform, ...acc], []);
      state.filtered = state.reports.filter((report: IReport) => report.platform === action.payload);
    },
    filterReports: (state, action: PayloadAction<string>) => {
      state.filtered = state.reports.filter((report: IReport) => report.platform === action.payload);
    },
    updateReportInFiltered: (state, action: PayloadAction<IReport>) => {
      state.filtered = state.filtered.map((report: IReport) =>
        report.project === action.payload.project ? {...report, ...action.payload} : report)
    },
    clearFilters: (state) => {
      state.filtered = [];
    },
    setIsUploading: (state, action: PayloadAction<boolean>) => {
      state.isUploading = action.payload;
    },
  },
})

export const reportsReducer = reportsSlice.reducer;
export const reportsActions = reportsSlice.actions;
