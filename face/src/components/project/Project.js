import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { setProjectOnEdit } from "../../redux/reports/reports.utils"
import { compose } from "../../utils"
import { withApiService } from "../../hoc"
import { openModal } from "../../redux/reports/reports.actions"

import classes from './Project.module.scss'
import { DeleteButton, EditButton } from "../buttons"
import EditedProject from "../edited-project"
import Statistics from "../statistics"

class Project extends Component {
    testDuration = (duration) => {
        const ms = 1000 * Math.round(duration / 1000)
        const d = new Date(ms)
        const hours = d.getUTCHours() > 9 ? `${d.getUTCHours()}` : d.getUTCHours() ? `0${d.getUTCHours()}` : '00'
        const minutes = d.getUTCMinutes() > 9 ? `${d.getUTCMinutes()}` : d.getUTCMinutes() ? `0${d.getUTCMinutes()}` : '00'
        const seconds = d.getUTCSeconds() > 9 ? `${d.getUTCSeconds()}` : d.getUTCSeconds() ? `0${d.getUTCSeconds()}` : '00'
        return `${hours}:${minutes}:${seconds}`
    }

    lastTestRun = (time) => {
        const date = time ? new Date(time) : 0
        return date ? date.toLocaleString() : ''
    }

    onDelete = () => {
        const { project, description } = this.props.project
        this.props.openModal({
            type: 'delete',
            project: project,
            title: 'Подтверждение удаления',
            text: `Удаление проекта: ${description.toString().toLowerCase()} (${project})`
        })
    }

    onEditClick = () => {
        const { description, project, platform } = this.props.project
        this.props.setCurrentProject({ description, project, platform })()
    }

    render () {
        const { description, project, platform, hasReports, statistic = {}, time = {} } = this.props.project
        const { start = 0, duration = 0 } = time
        const { failed = 0, broken = 0, skipped = 0, passed = 0, total = 0 } = statistic

        const emptyProject = (
            <div className={classes['empty-project']}>
                <div onClick={this.onEditClick} className={classes.description}>
                    <span className={['description-text']}>{description}</span>
                    <span className={classes.subtext}>Проект: {project}</span>
                    <span className={classes.subtext}>Платформа: {platform}</span>
                </div>
                <div className={classes.buttons}>
                    <EditButton onClick={this.onEditClick} />
                    <DeleteButton onClick={this.onDelete} />
                </div>
            </div>
        )

        const currentProject = (
            <div className={classes.project}>
                <div className={classes.infoContainer}>
                        <span className={classes.description}>
                            <a href={`${window.location.href}web/allure/${project}`} target="_blank" rel="noopener noreferrer">
                                <div className={classes['description-text']}>{description}</div>
                                <div className={classes.subtext}>Проект: {project}</div>
                                <div className={classes.subtext}>Платформа: {platform}</div>
                            </a>
                        </span>
                    <span className={classes.duration}>
                            <a
                                href={`${window.location.href}web/allure/${project}`}
                                target="_blank"
                                rel="noopener noreferrer">{this.testDuration(duration)}</a>
                        </span>
                    <span className={classes.duration}>
                            <a
                                href={`${window.location.href}web/allure/${project}`}
                                target="_blank"
                                rel="noopener noreferrer">{this.lastTestRun(start)}</a>
                        </span>
                    <span className={`${classes.passed} ${classes.ownStat}`}>{passed}</span>
                    <span className={`${classes.failed} ${classes.ownStat}`}>{failed}</span>
                    <span className={`${classes.broken} ${classes.ownStat}`}>{broken}</span>
                    <span className={`${classes.skipped} ${classes.ownStat}`}>{skipped}</span>
                    <span className={`${classes.total} ${classes.ownStat}`}>{total}</span>
                    <span className={classes.stats}><Statistics statistic={statistic} /></span>
                </div>
                <div className={classes.buttons}>
                    <EditButton onClick={this.onEditClick} />
                    <DeleteButton onClick={this.onDelete} />
                </div>
            </div>
        )

        return (
            <>
                {project === this.props.currentProject.project
                    ? <EditedProject project={this.props.project} /> : hasReports ? currentProject : emptyProject}
            </>
        )
    }
}

const mapStateToProps = ({ reports: { currentProject, loading, error } }) => {
    return { currentProject, loading, error }
}

const mapDispatchToProps = (dispatch, { apiService }) => {
    return bindActionCreators({
        setCurrentProject: (project) => setProjectOnEdit(project),
        openModal: (modal) => openModal(modal)
    }, dispatch)
}

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(Project)
