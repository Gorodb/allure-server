import React from "react"

// @ts-ignore
import Markdown from '@loopmode/markdown'
import classes from "./Examples.module.scss";
import {installations, pyCode, runScriptAfterTests} from "./codeExamplePython";

const EnPythonExample = () => {
  return (
    <>
      <div className={classes['code-description']}>Adding dependencies:</div>
      <Markdown>
        {installations}
      </Markdown>
      <div className={classes['code-description']}>Creating file <span>archiver.py</span>. And adding some code for archiving,
        creating project, sending file on server and deleting it from local folder.</div>
      <Markdown>
        {pyCode}
      </Markdown>
      <div className={classes['code-description']}>On 'webdriver ui' example adding automation sending after tests finish.</div>
      <div className={classes['code-description']}>Into the file <span>conftest.py</span> add some code:</div>
      <Markdown>
        {runScriptAfterTests}
      </Markdown>
    </>
  )
}

export default EnPythonExample
