import React, {useEffect} from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { closeModal } from "../../redux/reports/reports.actions"

import classes from './Modal.module.scss'
import DeleteModal from "./DeleteModal"
import { CloseButton } from "../buttons"

const Modal = ({ modal, closeModal }) => {
    useEffect(() => {
        if (modal) {
            document.body.style['overflow-y'] = 'hidden'
            document.body.style['padding-right'] = 'calc(100vw - 100%)'
        }
        return () => {
            document.body.style['overflow-y'] = 'auto'
            document.body.style['padding-right'] = 0
        }
    }, [modal])

    const handleKeyDown = (event) => {
        if (event.keyCode === 27 /*esc*/) {
            closeModal()
        }
    }

    const modalContent = (
        <div className={classes.modal} onKeyDown={handleKeyDown}>
            <div className={classes.overlay} onClick={closeModal} />
            <div className={classes['modal-container']}>
                <div className={classes.close}>
                    <CloseButton onClick={closeModal} />
                </div>
                <DeleteModal />
            </div>
        </div>
    )

    return modal ? modalContent : null
}

const mapStateToProps = ({ reports: { modal }}) => {
    return { modal }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        closeModal: closeModal
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
