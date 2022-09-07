import {LocalizedStringsMethods} from "react-localization";

export interface IStrings extends LocalizedStringsMethods {
  examples: {
    jsExample: any,
    pythonExample: any,
  },
  projectsHeader: {
    description: string,
    time: string,
    lastRun: string,
    passed: string,
    failed: string,
    broken: string,
    skipped: string,
    total: string,
    statistics: string,
    errorMessage: string,
  },
  header: {
    main: string,
    examples: string,
    pageTitle: string,
    newProject: string,
  },
  mainPage: {
    filterTitle: string,
  },
  project: {
    description: string,
    project: string,
    platform: string,
    entrypoint: string,
    reportType: string,
    allureUpload: string,
    htmlUpload: string,
    loading: string,
  },
  modal: {
    title: string,
    text: string,
  },
  buttons: {
    delete: string,
    submit: string,
  },
  messages: {
    createNewProjectError: string,
    deleteProjectSuccess: string,
    deleteProjectError: string,
    fileUploadSuccess: string,
    fileUploadError: string,
    notFound: string,
  },
}