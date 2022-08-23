import React, {KeyboardEvent, useEffect} from "react"

import classes from './Modal.module.scss'
import DeleteModal from "./DeleteModal"
import {CloseButton} from "../buttons"
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";

const Modal = () => {
  const {modal} = useTypedSelector(state => state.modal)
  const {closeModal} = useActions()

  useEffect(() => {
    if (modal) {
      // @ts-ignore
      document.body.style['overflow-y'] = 'hidden'
      // @ts-ignore
      document.body.style['padding-right'] = 'calc(100vw - 100%)'
    }
    return () => {
      // @ts-ignore
      document.body.style['overflow-y'] = 'auto'
      // @ts-ignore
      document.body.style['padding-right'] = 0
    }
  }, [modal])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.keyCode === 27 /*esc*/) {
      closeModal()
    }
  }

  const modalContent = (
    <div className={classes.modal} onKeyDown={handleKeyDown}>
      <div className={classes.overlay} onClick={closeModal}/>
      <div className={classes['modal-container']}>
        <div className={classes.close}>
          <CloseButton onClick={closeModal}/>
        </div>
        <DeleteModal />
      </div>
    </div>
  )

  return modal ? modalContent : null
}

export default Modal;
