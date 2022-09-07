import React from "react"
import {Link, useLocation} from "react-router-dom"
import cn from 'classnames'

import classes from './Navbar.module.scss'
import {useActions} from "../../hooks/useActions";
import {LanguageSwitcher} from "../language-switcher/languageSwitcher";
import {strings} from "../../localization/strings";

const NavBar = () => {
  const location = useLocation()
  const {createNewProject} = useActions();

  const newProjectLink = ['', 'ru', 'en'].includes(location.pathname.replaceAll('/', ''))
    && <div className={classes.textContainer}>
      <span className={classes['header-link']} onClick={() => createNewProject()}>{strings.header.newProject}</span>
    </div>

  return (
    <header>
      <div className={classes.container}>
        <div className={`${classes.links} ${classes.row}`}>
          <Link className={classes['header-link']} to={`./${strings.getLanguage()}`}>{strings.header.main}</Link>
          <Link className={classes['header-link']} to={`./${strings.getLanguage()}/examples`}>{strings.header.examples}</Link>
        </div>
        <Link to={`./${strings.getLanguage()}`} className={cn([classes.row, classes.center])}>
          <div className={classes.title}>{strings.header.pageTitle}</div>
        </Link>
        <div className={cn([classes.row, classes.rightMenu])}>
          {newProjectLink}
          <LanguageSwitcher/>
        </div>
      </div>
    </header>
  )
}

export default NavBar;
