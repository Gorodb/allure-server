import React from "react"

// @ts-ignore
import Markdown from '@loopmode/markdown'
import classes from "./Examples.module.scss";
import {installations, pyCode, runScriptAfterTests} from "./codeExamplePython";

const RuPythonExample = () => {
  return (
    <>
      <div className={classes['code-description']}>Добавляем зависимости:</div>
      <Markdown>
        {installations}
      </Markdown>
      <div className={classes['code-description']}>Создаем файл <span>archiver.py</span>. И добавляем немного кода для архивации,
        создания проекта, отправки архива с отчетами на сервер и удаления их после архивации.</div>
      <Markdown>
        {pyCode}
      </Markdown>
      <div className={classes['code-description']}>На примере 'webdriver ui' добавляем автоматическую отправку отчетов после выполнения тестов.</div>
      <div className={classes['code-description']}>В файл <span>conftest.py</span> добавляем немного кода:</div>
      <Markdown>
        {runScriptAfterTests}
      </Markdown>
    </>
  )
}

export default RuPythonExample;
