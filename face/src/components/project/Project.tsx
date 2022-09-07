import classes from './Project.module.scss'
import {DeleteButton, EditButton} from "../buttons"
import EditedProject from "../edited-project"
import Statistics from "../statistics"
import {ProjectProps} from "./Project.props";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ModalTypes} from "../../store/modal/modal.slice";
import {ReportsTypesEnum} from "../../enums/reportsTypes.enum";
import {strings} from "../../localization/strings";

const Project = ({report}: ProjectProps) => {
  const {setProjectOnEdit, openModal} = useActions()
  const {currentProject} = useTypedSelector(state => state.reports)
  const testDuration = (duration: number) => {
    const ms = 1000 * Math.round(duration / 1000)
    const d = new Date(ms)
    const hours = d.getUTCHours() > 9 ? `${d.getUTCHours()}` : d.getUTCHours() ? `0${d.getUTCHours()}` : '00'
    const minutes = d.getUTCMinutes() > 9 ? `${d.getUTCMinutes()}` : d.getUTCMinutes() ? `0${d.getUTCMinutes()}` : '00'
    const seconds = d.getUTCSeconds() > 9 ? `${d.getUTCSeconds()}` : d.getUTCSeconds() ? `0${d.getUTCSeconds()}` : '00'
    return duration ? `${hours}:${minutes}:${seconds}` : ''
  }

  const lastTestRun = (time: number) => {
    const date = time ? new Date(time) : 0
    return date ? date.toLocaleString() : ''
  }

  const onDelete = () => {
    const {project, description} = report
    openModal({
      type: ModalTypes.delete,
      project,
      title: strings.modal.title,
      text: `${strings.modal.text}: ${description.toString().toLowerCase()} (${project})`
    })
  }

  const onEditClick = () => {
    const {description, project, platform, type} = report;
    setProjectOnEdit({description, project, platform, type})
  }

  const {
    description,
    project,
    platform,
    type,
    entrypoint,
    hasReports,
    statistic = {failed: 0, broken: 0, skipped: 0, passed: 0, total: 0},
    time = {start: 0, duration: 0}
  } = report
  const {start, duration} = time
  const {failed, broken, skipped, passed, total} = statistic
  const hrefLink = type == ReportsTypesEnum.allure
    ? `${process.env.REACT_APP_API_URL}/web/allure/${project}`
    : `${process.env.REACT_APP_API_URL}/web/html/${project}/${entrypoint}`

  const emptyProject = (
    <div className={classes['empty-project']}>
      <div onClick={onEditClick} className={classes.description}>
        <span className={classes['description-text']}>{description}</span>
        <span className={classes.subtext}>{strings.project.project}: {project}</span>
        <span className={classes.subtext}>{strings.project.platform}: {platform} ({type}{type === ReportsTypesEnum.html && `, ${entrypoint}`})</span>
      </div>
      <div className={classes.buttons}>
        <EditButton onClick={onEditClick}/>
        <DeleteButton onClick={onDelete}/>
      </div>
    </div>
  )

  const currentProjectComponent = (
    <div className={classes.project}>
      <div className={classes.infoContainer}>
        <span className={classes.description}>
          <a href={hrefLink} target="_blank" rel="noopener noreferrer">
            <div className={classes['description-text']}>{description}</div>
            <div className={classes.subtext}>{strings.project.project}: {project}</div>
            <div className={classes.subtext}>
              {strings.project.platform}: {platform} ({type}{type === ReportsTypesEnum.html && `, ${entrypoint}`})
            </div>
          </a>
        </span>
        <span className={classes.duration}>
          <a
            href={hrefLink}
            target="_blank"
            rel="noopener noreferrer"
          >{testDuration(duration)}</a>
        </span>
        <span className={classes.duration}>
          <a
            href={hrefLink}
            target="_blank"
            rel="noopener noreferrer"
          >{lastTestRun(start)}</a>
        </span>
        <span className={`${classes.passed} ${classes.ownStat}`}>{passed}</span>
        <span className={`${classes.failed} ${classes.ownStat}`}>{failed}</span>
        <span className={`${classes.broken} ${classes.ownStat}`}>{broken}</span>
        <span className={`${classes.skipped} ${classes.ownStat}`}>{skipped}</span>
        <span className={`${classes.total} ${classes.ownStat}`}>{total}</span>
        <span className={classes.stats}><Statistics statistic={statistic}/></span>
      </div>
      <div className={classes.buttons}>
        <EditButton onClick={onEditClick}/>
        <DeleteButton onClick={onDelete}/>
      </div>
    </div>
  )

  return (
    <>
      {currentProject && project === currentProject!.project
        ? <EditedProject report={report}/> : hasReports ? currentProjectComponent : emptyProject}
    </>
  )
}

export default Project;
