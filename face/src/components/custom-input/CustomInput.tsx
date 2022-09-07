import React from "react"

import classes from './CustomInput.module.scss'
import {CustomInputProps} from "./CustomInput.props";

const CustomInput = ({onChange, label, inputRef, ...otherProps}: CustomInputProps) => {
  return (
    <div className={classes.group}>
      <input className={classes["form-input"]} ref={inputRef} onChange={onChange} {...otherProps} />
      {
        label ?
          (
            <label className={`${otherProps.value!.length ? classes.shrink : ''} ${classes['form-input-label']}`}>
              {label}
            </label>
          )
          : null
      }
    </div>
  )
}

export default CustomInput