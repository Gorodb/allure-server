import {ChangeEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState} from "react"

import '../file-drop/FileDrop.scss'
import classes from './EditedProject.module.scss'
import {CancelButton, SaveButton} from "../buttons"
import CustomInput from "../custom-input"
import FileDrop from "../file-drop/FileDrop"
import {EditProjectProps} from "./EditProject.props";
import {IProjectInfo} from "../../types/project.types";
import {useCreateProjectMutation, useLazyGetProjectsQuery} from "../../store/reports/reports.api";
import {useActions} from "../../hooks/useActions";
import {ReportsTypesEnum} from "../../enums/reportsTypes.enum";
import {strings} from "../../localization/strings";

const initialProject: IProjectInfo = {
  description: '',
  project: '',
  platform: '',
  type: ReportsTypesEnum.allure,
  entrypoint: "index.html"
}

const EditedProject = ({report}: EditProjectProps) => {
  const descriptionInput = useRef<HTMLInputElement>(null)
  const [saveProject] = useCreateProjectMutation()
  const {cancelEditProject} = useActions();
  const {description, project, platform, type, entrypoint} = report;
  const [getProjects] = useLazyGetProjectsQuery()

  const [projectInfo, setProjectInfo] = useState<IProjectInfo>(initialProject)

  useEffect(() => {
    setProjectInfo({description, project, platform, type, entrypoint})
    descriptionInput.current!.focus()
  }, [])

  const onSaveSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveProject(projectInfo);
    cancelEditProject()
    getProjects('')
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setProjectInfo({...projectInfo, [name]: value})
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.keyCode === 13 /*enter*/) {
      onSaveSubmit(event)
    }
    if (event.keyCode === 27 /*esc*/) {
      cancelEditProject()
    }
  }

  return (
    <div className={classes.project}>
      <form onSubmit={onSaveSubmit} className={classes['edit-project-form']} onKeyDown={handleKeyDown}>
        <div className={classes['project-block']}>
          <div className={classes['input-container']}>
            <CustomInput
              type="text"
              name="description"
              value={projectInfo.description}
              onChange={onChange}
              inputRef={descriptionInput}
              autoComplete="off"
              label={strings.project.description}
              required />
          </div>
          <div className={classes['input-container']}>
            <CustomInput
              type="text"
              name="platform"
              value={projectInfo.platform}
              onChange={onChange}
              autoComplete="off"
              label={strings.project.platform}
              required />
          </div>
          {type === ReportsTypesEnum.html && <div className={classes['input-container']}>
            <CustomInput
              type="text"
              name="entrypoint"
              value={projectInfo.entrypoint}
              onChange={onChange}
              autoComplete="off"
              label={strings.project.entrypoint}
              required/>
          </div>}
          <span className={classes.description}>
            <div>{strings.project.project}: {project}</div>
            <div>{strings.project.reportType}: {type}</div>
          </span>
        </div>
        <FileDrop project={project} projectType={type}/>
        <span className={classes.buttons}>
          <CancelButton onClick={cancelEditProject}/>
          <SaveButton type='submit'/>
        </span>
      </form>
    </div>
  )
}

export default EditedProject;
