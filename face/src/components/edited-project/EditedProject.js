import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { saveProject, cancelEditProject } from "../../redux/reports/reports.utils"
import { compose } from "../../utils"
import { withApiService } from "../../hoc"

import '../file-drop/FileDrop.scss'
import classes from './EditedProject.module.scss'
import { SaveButton, CancelButton } from "../buttons"
import CustomInput from "../custom-input"
import FileDrop from "../file-drop/FileDrop"

class EditedProject extends Component {
    descriptionInput = React.createRef()

    state = {
        description: '',
        project: '',
        platform: ''
    }

    componentDidMount() {
        const { description, project, platform } = this.props.project
        this.setState({ description, project, platform })
        this.descriptionInput.current.focus()
    }

    onSaveSubmit = (event) => {
        event.preventDefault()
        this.props.saveProject(this.state)()
        this.setState({
            description: ''
        })
    }

    onChange = (event) => {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    handleKeyDown = (event) => {
        if (event.keyCode === 13 /*enter*/) {
            this.onSaveSubmit(event)
        }
        if (event.keyCode === 27 /*esc*/) {
            this.props.resetForm()
        }
    }

    render () {
        const { project } = this.props.project
        const { description, platform } = this.state

        return (
            <div className={classes.project}>
                <form onSubmit={this.onSaveSubmit} className={classes['edit-project-form']} onKeyDown={this.handleKeyDown} >
                    <div className={classes['project-block']}>
                        <div className={classes['input-container']}>
                            <CustomInput
                                type="text"
                                name="description"
                                value={description}
                                onChange={this.onChange}
                                inputRef={this.descriptionInput}
                                autoComplete="off"
                                label='Описание'
                                required />
                        </div>
                        <div className={classes['input-container']}>
                            <CustomInput
                                type="text"
                                name="platform"
                                value={platform}
                                onChange={this.onChange}
                                autoComplete="off"
                                label='Платформа'
                                required />
                        </div>
                        <span className={classes.description}>
                            <div>Проект: {project}</div>
                        </span>
                    </div>
                    <FileDrop project={project} />
                    <span className={classes.buttons}>
                        <CancelButton onClick={this.props.resetForm} />
                        <SaveButton type='submit' />
                    </span>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, { apiService }) => {
    return bindActionCreators({
        saveProject: (project) => saveProject(project, apiService),
        resetForm: cancelEditProject()
    }, dispatch)
}

export default compose(
    withApiService(),
    connect(undefined, mapDispatchToProps)
)(EditedProject)
