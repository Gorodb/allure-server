import React from "react"
import ReactTooltip from "react-tooltip"

import classes from './Statistics.module.scss'

const Statistics = ({ statistic }) => {
    const stats = ({ total = 0, unknown = 0, passed = 0, failed = 0, broken = 0, skipped = 0 }) => {
        const sortedStats = { passed, unknown, failed, broken, skipped }

        let allStats = []

        for (let stat in sortedStats) {
            if (sortedStats.hasOwnProperty(stat)) {
                allStats = sortedStats[stat] !== 0 && stat !== 'total'
                    ? [...allStats, {
                        className: stat,
                        percent: percent(total, sortedStats[stat]),
                        count: sortedStats[stat]
                    }]
                    : allStats
            }
        }

        return allStats
    }

    const statBar = (statistic) => {
        return statistic.total
            ? stats(statistic).map(({ className, percent, count }, index) =>
                 <span
                    data-tip={`${className}: ${count}`}
                    className={`${classes[className]} ${classes.stat}`}
                    style={{width: `${percent}%`}}
                    key={index} />)
            : <span data-tip='Не удалось сгенерировать отчет' className={classes.default} />
    }

    return (
        <div className={classes.statistics}>
            <ReactTooltip backgroundColor='#5f5f5f' textColor='#fff' />
            {statBar(statistic)}
        </div>
    )
}

const percent = (total, value) => {
    return total === 0 || value === 0 ? 0 : 100 / total * value
}

export default Statistics
