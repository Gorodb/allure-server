import React from "react"

import classes from './Push.module.scss'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";

const Push = () => {
  const {alerts} = useTypedSelector(state => state.push)
  const {removeAlert} = useActions()

  return (
    <div className={classes.alerts}>
      {alerts.length > 0 && alerts.map(({id, text, type}) => (
        <div className={`${classes.alert} ${classes['alert-' + type]}`} key={id}>
          <span>{text}</span>
          <i className={`${classes.icon} ${classes['icon-' + type]}`} onClick={() => removeAlert(id!)}/>
        </div>
      ))}
    </div>
  )
}

export default Push;
