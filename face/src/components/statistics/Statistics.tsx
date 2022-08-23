import React from "react"

import classes from './Statistics.module.scss'
import {IStatistic} from "../../types/reports.types";

interface ISortedStats {
  passed: number;
  unknown: number;
  failed: number;
  broken: number;
  skipped: number;
}

const Statistics = ({statistic}: {statistic: IStatistic}) => {
  const stats = ({total = 0, unknown = 0, passed = 0, failed = 0, broken = 0, skipped = 0}) => {
    const sortedStats: ISortedStats = {passed, unknown, failed, broken, skipped}

    let allStats: any[] = []

    for (let stat in sortedStats) {
      // @ts-ignore
      const currentStat: number = sortedStats[stat];
      allStats = currentStat !== 0 && stat !== 'total'
        ? [...allStats, {
          className: stat,
          percent: percent(total, currentStat),
          count: currentStat
        }]
        : allStats
    }

    return allStats
  }

  const statBar = (statistic: IStatistic) => {
    return statistic.total
      ? stats(statistic).map(({className, percent, count}, index) =>
        <span
          data-tip={`${className}: ${count}`}
          className={`${classes[className]} ${classes.stat}`}
          style={{width: `${percent}%`}}
          key={index}/>)
      : <span data-tip='Could not generate reports' className={classes.default}/>
  }

  return (
    <div className={classes.statistics}>
      {statBar(statistic)}
    </div>
  )
}

const percent = (total: number, value: number) => {
  return total === 0 || value === 0 ? 0 : 100 / total * value
}

export default Statistics
