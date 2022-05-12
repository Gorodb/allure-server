import React from "react"

import classes from './Buttons.module.scss'
import trashIcon from "./assets/delete.svg";

const DeleteButton = ({onClick}) => {
    return (
            <button className={classes.btn} onClick={onClick} >
                <img src={trashIcon} className={classes.delete} alt={''}/>
            </button>
        )
}

export default DeleteButton
