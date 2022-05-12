import React from "react"

import classes from './Buttons.module.scss'

const CloseButton = ({ onClick }) => {
    return (
            <button className={classes['btn-t']} onClick={ onClick }>
                <div className={classes.cancel} />
            </button>
        )
}

export default CloseButton
