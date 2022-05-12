import { v4 as uuid } from 'uuid'

import {
    fetchReportsRequest,
    fetchReportsSuccess,
    fetchReportsError,
    deleteReportRequest,
    deleteReportSuccess,
    deleteReportError,
    fetchProjectRequest,
    fetchProjectSuccess,
    fetchProjectError,
    createNewProjectClick,
    onCancelEditProject,
    uploadReportRequest,
    uploadReportSuccess,
    uploadReportError,
    onEditProject,
    setPush,
    removePush,
    filterReports,
    updateReportInFiltered,
    updatePlatforms
} from "./reports.actions";

export const fetchReports = (apiService) => () => (dispatch) => {
    dispatch(fetchReportsRequest())
    apiService.getProjects()
        .then((data) => {
            !data.error
                ? dispatch(fetchReportsSuccess(data))
                : dispatch(fetchReportsError(data.error))
        })
        .catch(err => dispatch(fetchReportsError('Ошибка в запросе списка отчетов')))
}

export const deleteReport = (report, apiService) => (dispatch) => () => {
    dispatch(deleteReportRequest(report))
    apiService.deleteProject(report)
        .then(({ success, error }) => {
            if (success) {
                dispatch(deleteReportSuccess(report))
                dispatch(updatePlatforms())
            } else {
                setPushToState(`Ошибка при удалении файла: ${error}`, 'error', 5000)(dispatch)()
                dispatch(deleteReportError(error))
            }
        })
        .catch(() => dispatch(deleteReportError('Ошибка при удалении проекта')))
}

export const setProjectOnEdit = (project) => (dispatch) => () => {
    dispatch(onEditProject(project))
}

export const cancelEditProject = () => () => (dispatch) => {
    dispatch(onCancelEditProject())
}

export const clickOnCreateNewProject = () => () => (dispatch) => {
    dispatch(createNewProjectClick())
}

export const saveProject = (project, apiService) => (dispatch) => () => {
    dispatch(fetchProjectRequest(project))
    apiService.createProject(project)
        .then(({ error }) => {
            if (!error) {
                dispatch(fetchProjectSuccess())
            } else {
                setPushToState(`Ошибка при сохранении проекта: ${error}`, 'error', 5000)(dispatch)()
                dispatch(fetchProjectError(error))
            }
            fetchReports(apiService)()(dispatch)
            dispatch(updateReportInFiltered(project))
        })
        .catch(() => dispatch(fetchProjectError('Ошибка при создании проекта')))
}

export const uploadFile = (file, name, apiService) => (dispatch) => () => {
    dispatch(uploadReportRequest())
    apiService.upload(file, name)
        .then(({ success, error }) => {
            if (success ) {
                setPushToState('Файл загружен. После генерации, отчет появится на сайте', 'success', 5000)(dispatch)()
                dispatch(uploadReportSuccess(name))
            } else {
                setPushToState(`Ошибка при загрузке файла: ${error}`, 'error', 5000)(dispatch)()
                dispatch(uploadReportError(error))
            }
        })
        .catch(() => dispatch(fetchProjectError('Ошибка при создании проекта')))
}

export const setPushToState = (text, type, timeout = 3000) => (dispatch) => () => {
    const id = uuid()
    dispatch(setPush({ id, text, type, timeout }))
    setTimeout(() => dispatch(removePush(id)), timeout)
}

export const removePushFromState = (id) => (dispatch) => () => {
    dispatch(removePush(id))
}

export const filter = (platform) => (dispatch) => () => {
    dispatch(filterReports(platform))
}
