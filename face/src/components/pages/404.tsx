import classes from './Pages.module.scss'
import {strings} from "../../localization/strings";

export const NotFoundPage = (): JSX.Element => {
  return (
    <div className={classes.notFoundContainer}>{strings.messages.notFound}</div>
  )
}