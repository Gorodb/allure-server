import React from "react"

import classes from './Buttons.module.scss'
import editIcon from "./assets/edit.svg";

const EditButton = ({onClick}) => {
    return (
            <button className={classes.btn} onClick={onClick} >
                <img src={editIcon} className={classes.edit} alt=''/>
            </button>
        )
}

export default EditButton
