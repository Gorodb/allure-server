import React from "react"

import classes from './Buttons.module.scss'
import saveIcon from "./assets/check-mark.svg";
import {ButtonProps} from "./Button.props";

const SaveButton = ({onClick}: ButtonProps) => {
  return (
    <button className={classes.btn} onClick={onClick}>
      <img src={saveIcon} className={classes.save} alt=''/>
    </button>
  )
}

export default SaveButton
