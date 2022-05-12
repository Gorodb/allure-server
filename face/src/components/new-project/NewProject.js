import React, { Component } from "react"

import {bindActionCreators} from "redux"
import {cancelEditProject, saveProject} from "../../redux/reports/reports.utils"
import {compose} from "../../utils"
import {withApiService} from "../../hoc"
import {connect} from "react-redux"

import classes from './NewProject.module.scss'
import CustomInput from "../custom-input"
import { CancelButton, SaveButton } from "../buttons"

class NewProject extends Component {
    state = {
        description: '',
        project: '',
        platform: ''
    }

    myInput = React.createRef()

    componentDidMount() {
        this.myInput.current && this.myInput.current.focus()
    }

    onSaveSubmit = (event) => {
        event.preventDefault()
        this.props.saveProject(this.state)()
        this.setState({
            description: '',
            project: '',
            platform: ''
        })
    }

    onChange = (event) => {
        const { name, value } = event.target
        name === 'project' || name === 'platform'
            ? this.setState({ [name]: value.replace(/[^A-Za-z-0-9]/g, '').toLowerCase() })
            : this.setState({ [name]: value })
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
        const { description, project, platform } = this.state

        return (<div className={classes['new-project']}>
            <form onSubmit={this.onSaveSubmit} className={classes['edit-project-form']} onKeyDown={this.handleKeyDown}>
                <div className={classes.inputs}>
                    <div className={classes['input-container']} >
                        <CustomInput
                            type="text"
                            name="description"
                            value={description}
                            onChange={this.onChange}
                            label='Описание проекта'
                            inputRef={this.myInput}
                            autoComplete="off"
                            required />
                    </div>
                    <div className={classes['input-container']} >
                        <CustomInput
                            type="text"
                            name="project"
                            value={project}
                            onChange={this.onChange}
                            label='Проект'
                            autoComplete="off"
                            required />
                    </div>
                    <div className={classes['input-container']} >
                        <CustomInput
                            type="text"
                            name="platform"
                            value={platform}
                            onChange={this.onChange}
                            label='Платформа'
                            autoComplete="off"
                            required />
                    </div>
                </div>
                <span className={classes.buttons}>
                    <CancelButton onClick={this.props.resetForm}/>
                    <SaveButton type='submit'/>
                </span>
            </form>
        </div>)
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
)(NewProject)
