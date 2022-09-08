import {useEffect, useState} from "react";
import version from "../../utils/version"
import classes from './Projects.module.scss'
import Project from "../project"
import Spinner from "../spinner"
import NewProject from "../new-project"
import CustomFilter from "../custom-filter"
import {IReport} from "../../types/reports.types";
import {useGetProjectsQuery, useLazyGetProjectsQuery} from "../../store/reports/reports.api";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {strings} from "../../localization/strings";

const Projects = () => {
  const [eventListener, setEventListener] = useState<EventSource | null>(null);
  const {data, isLoading, error} = useGetProjectsQuery("")
  const [getProjects] = useLazyGetProjectsQuery()
  const {filterReports, clearFilters, setReportsToState, setPlatforms} = useActions();
  const {filtered, newProject, platforms} = useTypedSelector(store => store.reports)
  const { reports } = useTypedSelector(state => state.reports)

  useEffect(() => {
    let eventSource = new EventSource(`${process.env.REACT_APP_API_URL}/api/allure/stream`)
    setEventListener(eventSource)
    return () => {
      eventSource.close()
      setEventListener(null)
    }
  }, [])

  useEffect(() => {
    if (data && !isLoading) {
      setReportsToState(data.reports);
      setPlatforms(data.reports)
    }
  }, [data])

  if (eventListener) {
    eventListener.addEventListener("upload",  (event) => {
      getProjects("")
    })
  }

  if (isLoading) {
    return <div className={classes.spinner}><Spinner/></div>
  }

  if (error) {
    return <div>{strings.projectsHeader.errorMessage}</div>
  }

  const reportsToRender = !!filtered.length ? filtered : reports

  const allProjects = reportsToRender.map((report: IReport) => {
    return <Project key={report._id} report={report}/>
  })

  return (
    <section className={classes.reports}>
      <CustomFilter
        filtered={filtered}
        filterItems={platforms}
        filterFunction={filterReports}
        clearFilter={clearFilters}
        defaultText={strings.mainPage.filterTitle}
      />
      <div className={classes.container}>
        <div className={classes.header}>
          <span className={classes.description}>{strings.projectsHeader.description}</span>
          <span className={classes.duration}>{strings.projectsHeader.time}</span>
          <span className={classes.duration}>{strings.projectsHeader.lastRun}</span>
          <span className={classes.ownStat}>{strings.projectsHeader.passed}</span>
          <span className={classes.ownStat}>{strings.projectsHeader.failed}</span>
          <span className={classes.ownStat}>{strings.projectsHeader.broken}</span>
          <span className={classes.ownStat}>{strings.projectsHeader.skipped}</span>
          <span className={classes.ownStat}>{strings.projectsHeader.total}</span>
          <span className={classes.stats}>{strings.projectsHeader.statistics}</span>
          <span className={classes.buttons}/>
        </div>
        {newProject ? <NewProject/> : null}
        {allProjects}
      </div>
      <div className={classes.version}>{version}</div>
    </section>
  )
}

export default Projects;
