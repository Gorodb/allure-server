import React, {useEffect, useRef} from "react"

import classes from './Modal.module.scss'
import {Button} from "../buttons"
import {ButtonTypesEnum} from "../../enums/buttonTypes.enum";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {useRemoveProjectMutation} from "../../store/reports/reports.api";
import {AlertsTypesEnum} from "../../store/alerts/alerts.slice";
import {useAlerts} from "../../hooks/useAlerts";

const DeleteModal = () => {
  const {title, text, project} = useTypedSelector(state => state.modal.modal!)
  const [removeProject, {isSuccess, isError, error}] = useRemoveProjectMutation()
  const {deleteReport, closeModal, updatePlatform, clearFilters} = useActions()
  const deleteButton = useRef<HTMLButtonElement>(null)
  const setAlert = useAlerts()

  useEffect(() => {
    deleteButton.current!.focus()
  }, [])

  useEffect(() => {
    if (isSuccess) {
      deleteReport(project)
      updatePlatform(project)
      clearFilters()
      closeModal()
      setAlert({
        type: AlertsTypesEnum.success,
        text: `Project ${project} was successfully deleted`
      })
    }
    if (isError) {
      closeModal()
      setAlert({
        type: AlertsTypesEnum.error,
        text: `Could not delete project ${project}, \r\n ${error}`
      })
    }
  }, [isSuccess, isError])

  return (
    <div className={classes['modal-content']}>
      <span className={classes.title}>{title}</span>
      <span className={classes.message}>{text}</span>
      <Button
        buttonRef={deleteButton}
        buttonType={ButtonTypesEnum.DARK}
        onClick={() => removeProject({project})}
      >Delete</Button>
    </div>
  )
}

export default DeleteModal;
