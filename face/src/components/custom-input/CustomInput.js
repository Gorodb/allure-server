import React from "react"

import classes from './CustomInput.module.scss'

const CustomInput = ({ handleChange, label, inputRef, ...otherProps }) => {
    return (
        <div className={classes.group}>
            <input className={classes["form-input"]} ref={inputRef} onChange={handleChange} {...otherProps} />
            {
                label ?
                    (
                        <label className={`${otherProps.value.length ? classes.shrink : ''} ${classes['form-input-label']}`}>
                            {label}
                        </label>
                    )
                    : null
            }
        </div>
    )
}

export default CustomInput