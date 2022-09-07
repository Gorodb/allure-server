import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
  ICreateProjectBody,
  ICreateProjectResponse,
  IRemoveProjectBody, IRemoveProjectResponse,
  IReports, IUploadReportBody, IUploadReportResponse
} from "../../types/reports.types";

export const reportsApi = createApi({
  reducerPath: 'api/reports',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_URL}/api/allure/`}),
  endpoints: (builder) => {
    return {
      getProjects: builder.query<IReports, any>({
        query: () => {
          return {
            url: `info`,
          }
        },
      }),
      createProject: builder.mutation<ICreateProjectResponse, ICreateProjectBody>({
        query: (body: ICreateProjectBody) => ({
          url: "project",
          method: "POST",
          body,
          crossDomain: true,
          responseType: "json",
        }),
        transformResponse: (response: ICreateProjectResponse) => {
          return response
        }
      }),
      removeProject: builder.mutation<IRemoveProjectResponse, IRemoveProjectBody>({
        query: (body: IRemoveProjectBody) => ({
          url: "remove_project",
          method: "POST",
          body,
          crossDomain: true,
          responseType: "json",
        }),
        transformResponse: (response: IRemoveProjectResponse) => {
          return response
        }
      }),
      uploadReport: builder.mutation<IUploadReportResponse, any>({
      query: ({name, file}: IUploadReportBody) => {
        const fd = new FormData()
        fd.append(name, file)
        return {
          url: "upload",
          method: "POST",
          body: fd,
          crossDomain: true,
          responseType: "json"
        }
      },
    }),
    }
  }
});

export const {
  useGetProjectsQuery,
  useLazyGetProjectsQuery,
  useCreateProjectMutation,
  useRemoveProjectMutation,
  useUploadReportMutation
} = reportsApi;
