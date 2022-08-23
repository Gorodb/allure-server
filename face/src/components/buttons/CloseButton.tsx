import React from "react"

import classes from './Buttons.module.scss'
import {ButtonProps} from "./Button.props";

const CloseButton = ({onClick}: ButtonProps) => {
  return (
    <button className={classes['btn-t']} onClick={onClick}>
      <div className={classes.cancel}/>
    </button>
  )
}

export default CloseButton
