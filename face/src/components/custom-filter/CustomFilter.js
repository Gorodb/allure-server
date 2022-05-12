import React, { useState } from "react"

import classes from './CustomFilter.module.scss'

const CustomFilter = ({ filtered, filterItems, filterFunction, clearFilter, defaultText }) => {
    const [isDropdownHidden, toggleDropdown] = useState(true)
    const [filter, setFilter] = useState(null)

    const onFilterArrowClick = () => {
        toggleDropdown(!isDropdownHidden)
        isDropdownHidden
            ? document.addEventListener("click", onClickOutsideListener)
            : document.removeEventListener("click", onClickOutsideListener)
    }

    const onClickOutsideListener = () => {
        if (!isDropdownHidden) toggleDropdown(true)
        document.removeEventListener("click", onClickOutsideListener)
    }

    const onMouseLeave = () => {
        !isDropdownHidden
            ? document.addEventListener("click", onClickOutsideListener)
            : document.removeEventListener("click", onClickOutsideListener)
    }

    const onFilterClearClick = () => {
        clearFilter()
        toggleDropdown(true)
        setFilter(null)
        document.removeEventListener("click", onClickOutsideListener)
    }

    const dropdown = (
            <div
                onMouseLeave={onMouseLeave}
                className={`${classes.dropdown} ${isDropdownHidden ? classes.hidden : null}`}
            >
                {filterItems.map((value, index) => {
                    return (
                        <div key={index} className={classes['drop-item']} onClick={() => {
                            onFilterArrowClick()
                            setFilter(value)
                            filterFunction(value)
                        }}>{value}</div>
                    )
                })}
            </div>
    )

    return (
        <div className={classes['filter-container']}>
            <div className={classes['filter-block']}>
                <div className={classes.filter}>
                    <span onClick={onFilterArrowClick} className={classes['filter-title']}>{ filter ? filter : defaultText }</span>
                    <div className={classes['buttons-block']}>
                        <div
                            className={`${classes['button-container']} ${!filtered.length ? classes.hidden : null}`}
                            onClick={onFilterClearClick}>
                            <span className={`${classes.close}`} />
                        </div>
                        <div className={classes['button-container']} onClick={onFilterArrowClick}>
                            <span className={`${classes.arrow} ${isDropdownHidden ? classes['arrow-down'] : classes['arrow-up']}`} />
                        </div>
                    </div>
                </div>
                {dropdown}
            </div>
        </div>
    )
}

export default CustomFilter
