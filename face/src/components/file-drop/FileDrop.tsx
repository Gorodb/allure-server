import Dropzone, {StatusValue} from 'react-dropzone-uploader'

import './FileDrop.scss'
import {useUploadReportMutation} from "../../store/reports/reports.api";
import {useEffect, useState} from "react";
import {useAlerts} from "../../hooks/useAlerts";
import {AlertsTypesEnum} from "../../store/alerts/alerts.slice";
import {useActions} from "../../hooks/useActions";
import {ReportsTypesEnum} from "../../enums/reportsTypes.enum";
import {strings} from "../../localization/strings";

const FileDrop = ({project, projectType}: { project: string, projectType: ReportsTypesEnum }) => {
  const [, setUploadStatus] = useState<string>('')
  const {cancelEditProject, setIsUploading} = useActions();
  const [upload, {isSuccess, isLoading, isError, error}] = useUploadReportMutation()
  const setAlert = useAlerts()

  const handleChangeStatus = ({ meta } : { [name: string]: any }, status: StatusValue) => {
    setUploadStatus(status)
  }

  useEffect(() => {
    setIsUploading(isLoading);
  }, [isLoading])

  useEffect(() => {
    if (isSuccess) {
      setAlert({
        text: strings.messages.fileUploadSuccess,
        type: AlertsTypesEnum.success
      }, 2000)
      cancelEditProject()
    }
    if (isError && error) {
      setAlert({
        // @ts-ignore
        text: `${strings.messages.fileUploadError}: ${error.data.error}`,
        type: AlertsTypesEnum.error
      }, 10000)
    }
  }, [isSuccess, isError])

  const handleSubmit = (files: any) => {
    upload({file: files[0].file, name: project})
    files.forEach((file: any) => file.remove())
  }

  const inputText = projectType === ReportsTypesEnum.allure
    ? strings.project.allureUpload
    : strings.project.htmlUpload

  const inputContentText = isLoading ? <span key='loading' className='loading'>{strings.project.loading}</span> : inputText

  return (
    <Dropzone
      onSubmit={handleSubmit}
      onChangeStatus={handleChangeStatus}
      maxFiles={1}
      autoUpload={false}
      inputContent={inputContentText}
      inputWithFilesContent='Choose file'
      submitButtonContent={strings.buttons.submit}
    />
  )
}

export default FileDrop;
