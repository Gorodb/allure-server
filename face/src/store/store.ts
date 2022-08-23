import {configureStore} from "@reduxjs/toolkit";
import {reportsApi} from "./reports/reports.api";
import {reportsReducer} from "./reports/reports.slice";
import {pushReducer} from "./alerts/alerts.slice";
import {modalReducer} from "./modal/modal.slice";

export const store = configureStore({
  reducer: {
    [reportsApi.reducerPath]: reportsApi.reducer,
    reports: reportsReducer,
    push: pushReducer,
    modal: modalReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  }).concat(
    reportsApi.middleware,
  )
});

export type TypeRootState = ReturnType<typeof store.getState>;
