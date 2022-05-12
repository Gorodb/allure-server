import { ReportsActionTypes } from "./reports.types"

const {
    FETCH_REPORTS_REQUEST,
    FETCH_REPORTS_SUCCESS,
    FETCH_REPORTS_FAILURE,
    DELETE_REPORT_REQUEST,
    DELETE_REPORT_SUCCESS,
    DELETE_REPORT_FAILURE,
    FETCH_PROJECT_REQUEST,
    FETCH_PROJECT_SUCCESS,
    FETCH_PROJECT_FAILURE,
    UPLOAD_REPORT_REQUEST,
    UPLOAD_REPORT_SUCCESS,
    UPLOAD_REPORT_FAILURE,
    ON_EDIT_PROJECT,
    UPDATE_CURRENT_PROJECT_VALUE,
    CREATE_NEW_PROJECT_CLICK,
    ON_CANCEL_EDIT_PROJECT,
    SET_PUSH,
    REMOVE_PUSH,
    FILTER_REPORTS,
    CLEAR_FILTERS,
    UPDATE_REPORT_IN_FILTERED,
    UPDATE_PLATFORMS,
    OPEN_MODEL,
    CLOSE_MODAL
} = ReportsActionTypes

export const fetchReportsRequest = () => ({
    type: FETCH_REPORTS_REQUEST
})

export const fetchReportsSuccess = reports => ({
    type: FETCH_REPORTS_SUCCESS,
    payload: reports
})

export const fetchReportsError = error => ({
    type: FETCH_REPORTS_FAILURE,
    payload: error
})

export const deleteReportRequest = () => ({
    type: DELETE_REPORT_REQUEST
})

export const deleteReportSuccess = reports => ({
    type: DELETE_REPORT_SUCCESS,
    payload: reports
})

export const deleteReportError = error => ({
    type: DELETE_REPORT_FAILURE,
    payload: error
})

export const fetchProjectRequest = () => ({
    type: FETCH_PROJECT_REQUEST
})

export const fetchProjectSuccess = () => ({
    type: FETCH_PROJECT_SUCCESS
})

export const fetchProjectError = error => ({
    type: FETCH_PROJECT_FAILURE,
    payload: error
})

export const uploadReportRequest = () => ({
    type: UPLOAD_REPORT_REQUEST
})

export const uploadReportSuccess = archive => ({
    type: UPLOAD_REPORT_SUCCESS,
    payload: archive
})

export const uploadReportError = error => ({
    type: UPLOAD_REPORT_FAILURE,
    payload: error
})

export const onEditProject = project => ({
    type: ON_EDIT_PROJECT,
    payload: project
})

export const onCancelEditProject = () => ({
    type: ON_CANCEL_EDIT_PROJECT
})

export const updateCurrentProject = value => ({
    type: UPDATE_CURRENT_PROJECT_VALUE,
    payload: value
})

export const createNewProjectClick = () => ({
    type: CREATE_NEW_PROJECT_CLICK
})

export const setPush = (push) => ({
    type: SET_PUSH,
    payload: push
})

export const removePush = uid => ({
    type: REMOVE_PUSH,
    payload: uid
})

export const filterReports = platform => ({
    type: FILTER_REPORTS,
    payload: platform
})

export const clearFilter = () => ({
    type: CLEAR_FILTERS
})

export const updateReportInFiltered = report => ({
    type: UPDATE_REPORT_IN_FILTERED,
    payload: report
})

export const updatePlatforms = () => ({
    type: UPDATE_PLATFORMS
})

export const openModal = modal => ({
    type: OPEN_MODEL,
    payload: modal
})

export const closeModal = () => ({
    type: CLOSE_MODAL
})
