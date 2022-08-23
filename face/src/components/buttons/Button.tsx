import {ButtonProps} from "./Button.props";
import classes from './Buttons.module.scss'

const Button = ({onClick, buttonType, buttonRef, children}: ButtonProps) => {
  return (
    <button ref={buttonRef} className={`${classes.button} ${buttonType ? classes[`btn-${buttonType}`] : null}`} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
