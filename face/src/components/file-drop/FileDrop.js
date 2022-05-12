import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Dropzone from 'react-dropzone-uploader'

import { uploadFile } from "../../redux/reports/reports.utils"
import { compose } from "../../utils"
import { withApiService } from "../../hoc"

import './FileDrop.scss'

const EditedProject = ({ project, upload }) => {
    // const handleChangeStatus = ({ meta, file }, status) => { console.l og(status, meta, file) }
    const handleSubmit = (files) => {
        upload(files[0].file, project)()
        files.forEach(file => file.remove())
    }

    return (
        <Dropzone
            // onChangeStatus={handleChangeStatus}
            onSubmit={handleSubmit}
            maxFiles={1}
            autoUpload={false}
            inputContent='Архив с allure-results'
            inputWithFilesContent='Выберите архив'
            submitButtonContent='Отправить'
        />
    )
}

const mapDispatchToProps = (dispatch, { apiService }) => {
    return bindActionCreators({
        upload: (file, fileName) => uploadFile(file, fileName, apiService)
    }, dispatch)
}

export default compose(
    withApiService(),
    connect(undefined, mapDispatchToProps)
)(EditedProject)
