import classes from './languages.module.scss'
import {useOutside} from "../../hooks/useOutside";
import {LanguagesDropdown} from "./languagesDropdown";
import {useActions} from "../../hooks/useActions";
import {strings} from "../../localization/strings";
import { useNavigate, useLocation } from 'react-router-dom';

export const LanguageSwitcher = (): JSX.Element => {
  const { ref, isShow, setIsShow } = useOutside();
  const navigate = useNavigate()
  const location = useLocation()

  const clickHandler = () => {
    setIsShow(!isShow);
  }

  const onSelectLanguage = (language: string) => {
    strings.setLanguage(language);
    const page = location.pathname.split('/').slice(2)
    navigate(`/${language}/${page}`)
  }

  return (
    <div className={classes.langBlock} onClick={() => setIsShow(!isShow)}>
      <div className={classes.langContainer}>
        <span className={classes.langTitle}>{strings.getLanguage()}</span>
      </div>
      <LanguagesDropdown isShow={isShow} refObject={ref} onClick={clickHandler} onSelectLanguage={onSelectLanguage} />
    </div>
  )
}