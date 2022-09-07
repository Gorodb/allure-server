import React from "react"

// @ts-ignore
import Markdown from '@loopmode/markdown'

import classes from './Examples.module.scss'
import {axiosInstance, axiosMethods, installRequirements, sendMethods, testPhase} from "./codeExampleJS";

const EnJsExample = () => {
  // @ts-ignore
  // @ts-ignore
  return (
    <>
      <div className={classes['code-description']}>Adding dependencies</div>
      <Markdown>
        {installRequirements}
      </Markdown>
      <div className={classes['code-description']}>Adding <span>archiver.js</span> file into the root dir. It will
        run after <span>test</span> phase
      </div>
      <Markdown>
        {sendMethods}
      </Markdown>
      <div className={classes['code-description']}>Adding axios instance: file <span>axiosInstance.js</span> into the
        folder <span>api</span></div>
      <Markdown>
        {axiosInstance}
      </Markdown>
      <div className={classes['code-description']}>Adding method to send report on server,
        file <span>requests.js</span></div>
      <Markdown>
        {axiosMethods}
      </Markdown>
      <div className={classes['code-description']}>Modifying <span>package.json</span> for sending reports</div>
      <Markdown>
        {testPhase}
      </Markdown>
    </>
  )
}
export default EnJsExample