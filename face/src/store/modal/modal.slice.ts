import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IReport} from "../../types/reports.types";

export enum ModalTypes {
  delete = "delete",
}

export interface IModal {
  type: ModalTypes,
  project: string,
  title: string,
  text: string,
}

const initialState: { modal: IModal | null } = {modal: null};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IModal>) => {
      state.modal = action.payload;
    },
    closeModal: (state) => {
      state.modal = null;
    },
  },
});

export const modalReducer = modalSlice.reducer;
export const modalActions = modalSlice.actions;
