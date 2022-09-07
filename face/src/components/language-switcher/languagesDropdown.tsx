import {DetailedHTMLProps, HTMLAttributes} from "react";
import cn from "classnames"

import classes from './languages.module.scss';
import {strings} from "../../localization/strings";

interface IComponentProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onClick: () => void;
  onSelectLanguage: (lang: string) => void;
  refObject: any;
  isShow: boolean;
}

export const LanguagesDropdown = ({onClick, onSelectLanguage, refObject, isShow, ...overProps}: IComponentProps): JSX.Element =>
    <div className={cn(classes.langDropdown, {
      [classes.visible]: isShow,
      [classes.invisible]: !isShow,
    })} onClick={onClick} ref={refObject} {...overProps}>
      {strings.getAvailableLanguages().map((lang, index) => {
        return (
          <div key={index} className={classes.langItem} onClick={() => onSelectLanguage(lang)}>{strings.getString('language', lang)}</div>
        )
      })}
    </div>
