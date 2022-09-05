import Dropzone, {StatusValue} from 'react-dropzone-uploader'

import './FileDrop.scss'
import {useUploadReportMutation} from "../../store/reports/reports.api";
import {useEffect, useState} from "react";
import {useAlerts} from "../../hooks/useAlerts";
import {AlertsTypesEnum} from "../../store/alerts/alerts.slice";
import {useActions} from "../../hooks/useActions";
import {ReportsTypesEnum} from "../../enums/reportsTypes.enum";

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
        text: 'File uploaded. Report will appear on website after generation',
        type: AlertsTypesEnum.success
      }, 2000)
      cancelEditProject()
    }
    if (isError && error) {
      setAlert({
        // @ts-ignore
        text: `An error occurred while uploading the file, try again or select another file. Error: ${error.data.error}`,
        type: AlertsTypesEnum.error
      }, 10000)
    }
  }, [isSuccess, isError])

  const handleSubmit = (files: any) => {
    upload({file: files[0].file, name: project})
    files.forEach((file: any) => file.remove())
  }

  const inputText = projectType === ReportsTypesEnum.allure
    ? 'Archive with allure-results'
    : 'Archive with reports'

  const inputContentText = isLoading ? <span key='loading' className='loading'>Loading...</span> : inputText

  return (
    <Dropzone
      onSubmit={handleSubmit}
      onChangeStatus={handleChangeStatus}
      maxFiles={1}
      autoUpload={false}
      inputContent={inputContentText}
      inputWithFilesContent='Choose file'
      submitButtonContent='Submit'
    />
  )
}

export default FileDrop;
