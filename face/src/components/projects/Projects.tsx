import version from "../../utils/version"
import classes from './Projects.module.scss'
import Project from "../project"
import Spinner from "../spinner"
import NewProject from "../new-project"
import CustomFilter from "../custom-filter"
import {IReport} from "../../types/reports.types";
import {useGetProjectsQuery} from "../../store/reports/reports.api";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useEffect} from "react";

const Projects = () => {
  const {data, isLoading, error} = useGetProjectsQuery("")
  const {filterReports, clearFilters, setReportsToState, setPlatforms} = useActions();
  const {filtered, newProject, platforms} = useTypedSelector(store => store.reports)
  const { reports } = useTypedSelector(state => state.reports)

  useEffect(() => {
    if (data && !isLoading) {
      setReportsToState(data.reports);
      setPlatforms(data.reports)
    }
  }, [data])

  if (isLoading) {
    return <div className={classes.spinner}><Spinner/></div>
  }

  if (error) {
    return <div>Something went wrong...</div>
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
        defaultText='Chose platform'
      />
      <div className={classes.container}>
        <div className={classes.header}>
          <span className={classes.description}>Project</span>
          <span className={classes.duration}>Test time</span>
          <span className={classes.duration}>Lust run</span>
          <span className={classes.ownStat}>passed</span>
          <span className={classes.ownStat}>failed</span>
          <span className={classes.ownStat}>broken</span>
          <span className={classes.ownStat}>skipped</span>
          <span className={classes.ownStat}>total</span>
          <span className={classes.stats}>Statistics</span>
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
