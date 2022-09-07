import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'

import './react-tabs.scss'
import classes from './Pages.module.scss'
import {strings} from "../../localization/strings";

const ExamplesPage = () => {
  return (
    <div className={classes.container}>
      <Tabs>
        <TabList>
          <Tab>JavaScript</Tab>
          <Tab>Python</Tab>
        </TabList>

        <TabPanel>
          {strings.examples.jsExample()}
        </TabPanel>
        <TabPanel>
          {strings.examples.pythonExample()}
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default ExamplesPage