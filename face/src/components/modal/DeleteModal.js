import React, { useRef, useEffect } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import classes from './Modal.module.scss'
import { Button } from "../buttons"

import { compose } from "../../utils"
import { deleteReport } from "../../redux/reports/reports.utils"
import { withApiService } from "../../hoc"

const DeleteModal = ({ title, text, project, deleteReport }) => {
    const deleteButton = useRef(null)

    useEffect(() => {
        deleteButton.current.focus()
    }, [])

    return (
        <div className={classes['modal-content']}>
            <span className={classes.title}>{title}</span>
            <span className={classes.message}>{text}</span>
            <Button buttonRef={deleteButton} type='dark' onClick={ () => deleteReport(project)() }>Удалить</Button>
        </div>
    )
}

const mapStateToProps = ({ reports: { modal: { title, text, project } }}) => {
    return { title, text, project }
}

const mapDispatchToProps = (dispatch, { apiService }) => {
    return bindActionCreators({
        deleteReport: (report) => deleteReport(report, apiService)
    }, dispatch)
}

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(DeleteModal)
