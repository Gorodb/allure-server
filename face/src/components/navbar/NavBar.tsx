import React from "react"
import {Link, useLocation} from "react-router-dom"

import classes from './Navbar.module.scss'
import {useActions} from "../../hooks/useActions";

const NavBar = () => {
  const {createNewProject} = useActions();
  const newProjectLink = useLocation().pathname === '/'
    ? <div className={`${classes.row}`}>
        <div className={classes.right}>
          <span className={classes['header-link']} onClick={() => createNewProject()}>Add new project</span>
        </div>
      </div>
    : null

  return (
    <header>
      <div className={classes.container}>
        <div className={`${classes.links} ${classes.row}`}>
          <Link className={classes['header-link']} to="./">Reports list</Link>
          <Link className={classes['header-link']} to="./examples">Examples</Link>
        </div>
        <Link to="./" className={`${classes.row} ${classes.center}`}>
          <div className={classes.title}>Reports hub</div>
        </Link>
        {newProjectLink}
      </div>
    </header>
  )
}

export default NavBar;
