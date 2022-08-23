import cn from "classnames";
import {SelectProps} from "./select.props";
import styles from './select.module.scss';

export const Select = ({
   children,
   onClear,
   label,
   defaultOptionText,
   className,
   isRequired,
   requiredText,
   ...props
 }: SelectProps): JSX.Element => {
  return (
    <div className={styles.formContainer}>
      {label && <label className={styles.label} htmlFor="adminSelect">{label}</label>}
      <div className={styles.selectContainer}>
        <select
          name="select"
          value={props.value ? props.value : ""}
          className={cn(styles.select, className)}
          {...props}
        >
          {defaultOptionText && <option disabled value="">{defaultOptionText}</option>}
          {children}
        </select>
        {isRequired && !props.value &&
          <span className={styles.requiredInfo}>{requiredText || "Обязательное поле"}</span>}
        {onClear && props.value && <i className={styles.icon} onClick={onClear}/>}
      </div>
    </div>
  )
}
