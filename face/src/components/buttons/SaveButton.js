import React from "react"

import classes from './Buttons.module.scss'
import saveIcon from "./assets/check-mark.svg";

const SaveButton = ({onClick}) => {
    return (
            <button className={classes.btn} onClick={onClick} >
                <img src={saveIcon} className={classes.save} alt=''/>
            </button>
        )
}

export default SaveButton
