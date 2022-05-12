import React from "react"

import classes from './Buttons.module.scss'

const Button = ({ onClick, type, buttonRef, children }) => {
    return (
            <button ref={buttonRef} className={`${classes.button} ${type ? classes[`btn-${type}`] : null }`} onClick={onClick} >
                {children}
            </button>
        )
}

export default Button
