import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { fetchReports, setProjectOnEdit } from "../../redux/reports/reports.utils"
import { compose } from "../../utils"
import { withApiService } from '../../hoc'
import { clearFilter, filterReports } from "../../redux/reports/reports.actions"

import version from "../../utils/version"
import classes from './Projects.module.scss'
import Project from "../project"
import Spinner from "../spinner"
import NewProject from "../new-project"
import CustomFilter from "../custom-filter"

class Projects extends Component {
    componentDidMount () {
        this.props.fetchReports()
    }

    render () {
        const { reports, filtered, loading, newProject, platforms, filterReports, clearFilter } = this.props

        if (loading) {
            return <div className={classes.spinner}><Spinner /></div>
        }

        const reportsToRender = !!filtered.length ? filtered : reports

        const allProjects = reportsToRender.map(({ _id, description, platform, project, hasReports, statistic, time }) => {
            return <Project key={_id} project={{ _id, description, platform, project, hasReports, statistic, time }} />
        })

        return (
            <section className={classes.reports}>
                <CustomFilter
                    filtered={filtered}
                    filterItems={platforms}
                    filterFunction={filterReports}
                    clearFilter={clearFilter}
                    defaultText='Выберите платформу'
                />
                <div className={classes.container}>
                    <div className={classes.header}>
                        <span className={classes.description}>Проект</span>
                        <span className={classes.duration}>Время теста</span>
                        <span className={classes.duration}>Последний запуск</span>
                        <span className={classes.ownStat}>passed</span>
                        <span className={classes.ownStat}>failed</span>
                        <span className={classes.ownStat}>broken</span>
                        <span className={classes.ownStat}>skipped</span>
                        <span className={classes.ownStat}>total</span>
                        <span className={classes.stats}>Статистика</span>
                        <span className={classes.buttons} />
                    </div>
                    { newProject ? <NewProject /> : null }
                    { allProjects }
                </div>
                <div className={classes.version}>{version}</div>
            </section>
        )
    }
}

const mapStateToProps = ({ reports: { reports, filtered, loading, error, newProject, platforms, filterReports, clearFilter }}) => {
    return { reports, loading, error, newProject, platforms, filtered, filterReports, clearFilter }
}

const mapDispatchToProps = (dispatch, { apiService }) => {
    return bindActionCreators({
        fetchReports: fetchReports(apiService),
        setCurrentProject: (project) => setProjectOnEdit(project),
        filterReports: (platform) => filterReports(platform),
        clearFilter: () => clearFilter()
    }, dispatch)
}

export default compose(
    withApiService(),
    connect(mapStateToProps, mapDispatchToProps)
)(Projects)
