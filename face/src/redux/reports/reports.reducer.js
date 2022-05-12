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
    CLEAR_FILTERS,
    FILTER_REPORTS,
    UPDATE_REPORT_IN_FILTERED,
    UPDATE_PLATFORMS,
    OPEN_MODEL,
    CLOSE_MODAL
} = ReportsActionTypes

const initialState = {
    loading: true,
    reports: [],
    filtered: [],
    platforms: [],
    currentProject: {},
    newProject: false,
    error: null,
    alerts: [],
    modal: null
}

const reports = (state, action) => {
    switch (action.type) {
        case FETCH_REPORTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                reports: []
            }
        case FETCH_REPORTS_SUCCESS:
            return {
                ...state,
                reports: action.payload,
                platforms: action.payload.reduce((acc, { platform }) => acc.includes(platform) ? acc : [platform, ...acc], []),
                loading: false,
                error: null
            }
        case FETCH_REPORTS_FAILURE:
            return {
                ...state,
                devices: [],
                loading: false,
                error: action.payload
            }
        case DELETE_REPORT_REQUEST:
            return {
                ...state,
                loading: true,
                modal: null,
                error: null
            }
        case DELETE_REPORT_SUCCESS:
            return {
                ...state,
                reports: state.reports.filter(({ project }) => project !== action.payload),
                loading: false,
                error: null
            }
        case DELETE_REPORT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case FETCH_PROJECT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_PROJECT_SUCCESS:
            return {
                ...state,
                currentProject: {},
                newProject: false,
                loading: false,
                error: null
            }
        case FETCH_PROJECT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPLOAD_REPORT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case UPLOAD_REPORT_SUCCESS:
            return {
                ...state,
                currentProject: {},
                loading: false,
                error: null
            }
        case UPLOAD_REPORT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ON_EDIT_PROJECT:
            return {
                ...state,
                loading: false,
                currentProject: action.payload,
                error: null
            }
        case ON_CANCEL_EDIT_PROJECT:
            return {
                ...state,
                loading: false,
                currentProject: {},
                newProject: false,
                error: null
            }
        case UPDATE_CURRENT_PROJECT_VALUE:
            return {
                ...state,
                loading: false,
                currentProject: action.payload,
                error: null
            }
        case CREATE_NEW_PROJECT_CLICK:
            return {
                ...state,
                loading: false,
                currentProject: {},
                newProject: true,
                error: null
            }
        case SET_PUSH:
            return {
                ...state,
                alerts: [...state.alerts, action.payload]
            }
        case REMOVE_PUSH:
            return {
                ...state,
                alerts: state.alerts.filter(alert => alert.id !== action.payload)
            }
        case UPDATE_PLATFORMS:
            return {
                ...state,
                platforms: state.reports.reduce((acc, { platform }) => acc.includes(platform) ? acc : [platform, ...acc], []),
                filtered: state.reports.filter(report => report.platform === action.payload)
            }
        case FILTER_REPORTS:
            return {
                ...state,
                filtered: state.reports.filter(report => report.platform === action.payload)
            }
        case UPDATE_REPORT_IN_FILTERED:
            return {
                ...state,
                filtered: state.filtered.map(report => report.project === action.payload.project
                    ? {...report, ...action.payload} : report )
            }
        case CLEAR_FILTERS:
            return {
                ...state,
                filtered: []
            }
        case OPEN_MODEL:
            return {
                ...state,
                modal: action.payload
            }
        case CLOSE_MODAL:
            return {
                ...state,
                modal: null
            }
        default:
            return initialState
    }
}

export default reports
