import {ChangeEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState} from "react"

import classes from './NewProject.module.scss'
import CustomInput from "../custom-input"
import {CancelButton, SaveButton} from "../buttons"
import {IProjectInfo} from "../../types/project.types";
import {useActions} from "../../hooks/useActions";
import {useCreateProjectMutation, useLazyGetProjectsQuery} from "../../store/reports/reports.api";
import {AlertsTypesEnum} from "../../store/alerts/alerts.slice";
import {useAlerts} from "../../hooks/useAlerts";
import {ReportsTypesEnum} from "../../enums/reportsTypes.enum";
import {Select} from "../select";
import {strings} from "../../localization/strings";

const emptyProject: IProjectInfo = {
  description: '',
  project: '',
  platform: '',
  type: ReportsTypesEnum.allure,
  entrypoint: '',
}

const NewProject = () => {
  const [projectInfo, setProjectInfo] = useState<IProjectInfo>(emptyProject)
  const [getProjects] = useLazyGetProjectsQuery()
  const [saveProject, {isSuccess, isError, error}] = useCreateProjectMutation()
  const {cancelNewProject} = useActions()
  const setAlert = useAlerts()
  const [reportType, setReportType] = useState<ReportsTypesEnum>(ReportsTypesEnum.allure)

  useEffect(() => {
    if (isSuccess) {
      cancelNewProject()
      getProjects("")
    }
    if (isError) {
      setAlert({
        text: `${strings.messages.createNewProjectError}: ${error}`,
        type: AlertsTypesEnum.error
      })
    }
  }, [isSuccess, isError])

  const myInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    myInput.current && myInput.current.focus()
  }, [])

  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault()
    setReportType(event.target.value as ReportsTypesEnum)
  }

  const onSaveSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    saveProject({...projectInfo, type: reportType})
    setProjectInfo(emptyProject)
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    name === 'project' || name === 'platform'
      ? setProjectInfo({...projectInfo, [name]: value.replace(/[^A-Za-z-\d]/g, '').toLowerCase()})
      : setProjectInfo({...projectInfo, [name]: value})
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.keyCode === 13 /*enter*/) {
      onSaveSubmit(event)
    }
    if (event.keyCode === 27 /*esc*/) {
      cancelNewProject()
    }
  }

  return (<div className={classes['new-project']}>
    <form onSubmit={onSaveSubmit} className={classes['edit-project-form']} onKeyDown={handleKeyDown}>
      <div className={classes.inputs}>
        <div className={classes['input-container']}>
          <CustomInput
            type="text"
            name="description"
            value={projectInfo.description}
            onChange={onChange}
            label={strings.project.description}
            inputRef={myInput}
            autoComplete="off"
            required/>
        </div>
        <div className={classes['input-container']}>
          <CustomInput
            type="text"
            name="project"
            value={projectInfo.project}
            onChange={onChange}
            label={strings.project.project}
            autoComplete="off"
            required />
        </div>
        <div className={classes['input-container']}>
          <CustomInput
            type="text"
            name="platform"
            value={projectInfo.platform}
            onChange={onChange}
            label={strings.project.platform}
            autoComplete="off"
            required />
        </div>
        {reportType === ReportsTypesEnum.html && <div className={classes['input-container']}>
          <CustomInput
            type="text"
            name="entrypoint"
            value={projectInfo.entrypoint}
            onChange={onChange}
            label={strings.project.entrypoint}
            autoComplete="off"/>
        </div>}
        <div className={classes['input-container']}>
          <Select defaultOptionText={reportType} isRequired value={reportType} onChange={onChangeSelect} label={strings.project.reportType}>
            <option value={ReportsTypesEnum.allure}>{ReportsTypesEnum.allure}</option>
            <option value={ReportsTypesEnum.html}>{ReportsTypesEnum.html}</option>
          </Select>
        </div>
      </div>
      <span className={classes.buttons}>
        <CancelButton onClick={cancelNewProject}/>
        <SaveButton type='submit'/>
      </span>
    </form>
  </div>)
}

export default NewProject;
