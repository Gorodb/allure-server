import React from "react"
// @ts-ignore
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'

import './react-tabs.scss'
import classes from './Pages.module.scss'
import {JsExample, PythonExample} from "../examples"

const ExamplesPage = () => {
  return (
    <div className={classes.container}>
      <Tabs>
        <TabList>
          <Tab>JavaScript</Tab>
          <Tab>Python</Tab>
        </TabList>

        <TabPanel>
          <JsExample/>
        </TabPanel>
        <TabPanel>
          <PythonExample/>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default ExamplesPage