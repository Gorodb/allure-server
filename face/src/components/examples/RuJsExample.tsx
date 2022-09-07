import React from "react"

// @ts-ignore
import Markdown from '@loopmode/markdown'

import classes from './Examples.module.scss'
import {axiosInstance, axiosMethods, installRequirements, sendMethods, testPhase} from "./codeExampleJS";

const RuJsExample = () => {
  return (
    <>
      <div className={classes['code-description']}>Добавляем зависимостей</div>
      <Markdown>
        {installRequirements}
      </Markdown>
      <div className={classes['code-description']}>Добавляем <span>archiver.js</span> файл в корневую директорию. Он будет
        запущен после фазы <span>test</span>
      </div>
      <Markdown>
        {sendMethods}
      </Markdown>
      <div className={classes['code-description']}>Добавляем аксиос инстанс: файл <span>axiosInstance.js</span> в директорию <span>api</span></div>
      <Markdown>
        {axiosInstance}
      </Markdown>
      <div className={classes['code-description']}>Добавляем метод для отправки файла на сервер, файл <span>requests.js</span></div>
      <Markdown>
        {axiosMethods}
      </Markdown>
      <div className={classes['code-description']}>Модифицируем <span>package.json</span> для автоматической отправки отчетов</div>
      <Markdown>
        {testPhase}
      </Markdown>
    </>
  )
}

export default RuJsExample;
