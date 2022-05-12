import React from "react"

import Markdown from '@loopmode/markdown'
import classes from "./Examples.module.scss";

const installations = `
\`\`\`python
pip install requests
\`\`\`
`

const pyCode = `
\`\`\`python
import shutil
import requests
import os


def send_allure_results(allure, allure_zip, project):
    shutil.make_archive(allure, 'zip', allure)

    requests.post('http://localhost:5000/api/allure/project', data={
        'project': project,
        'description': 'Тесты админки (тест ролей)',
        'platform': 'admin'
    })

    requests.post('http://localhost:5000/api/allure/upload', headers={
        'cache-control': "no-cache",
    }, files={
        project: open(allure_zip, 'rb')
    })

    if os.path.isfile(allure_zip):
        os.remove(allure_zip)
    else:
        print("Error: %s архив не найден" % allure_zip)
\`\`\`
`

const runScriptAfterTests = `
\`\`\`python
# ...
from archiver import send_allure_results


@pytest.fixture(scope="session")
def browser():
    # ...
    yield driver
    # ...
    driver.quit()
    send_allure_results(allure='allure_results', allure_zip='allure_results.zip', project='admin-ui-tests')
\`\`\`
`

const PythonExample = () => {
    return (
        <>
            <div className={classes['code-description']}>Добавляем зависимости:</div>
            <Markdown>
                {installations}
            </Markdown>
            <div className={classes['code-description']}>Создаем файл <span>archiver.py</span>. И прописываем код для архивации,
                создания проекта, отправки файла на сервер и его удаления из локальной папки.</div>
            <Markdown>
                {pyCode}
            </Markdown>
            <div className={classes['code-description']}>На пример webdriver ui тестов добавляем автоматическую отправку после завершения всех тестов.</div>
            <div className={classes['code-description']}>В файл <span>conftest.py</span> добавляем код:</div>
            <Markdown>
                {runScriptAfterTests}
            </Markdown>
        </>
    )
}

export default PythonExample
