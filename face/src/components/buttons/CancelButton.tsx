import React from "react"

import classes from './Buttons.module.scss'
import cancelIcon from "./assets/cancel.svg";
import {ButtonProps} from "./Button.props";

const CancelButton = ({onClick}: ButtonProps) => {
  return (
    <button className={classes.btn} onClick={onClick}>
      <img src={cancelIcon} className={classes.cancel} alt=''/>
    </button>
  )
}

export default CancelButton
