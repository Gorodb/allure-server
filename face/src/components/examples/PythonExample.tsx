import React from "react"

// @ts-ignore
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
        'description': 'Website test',
        'platform': 'go-e'
    })

    requests.post('http://localhost:5000/api/allure/upload', headers={
        'cache-control': "no-cache",
    }, files={
        project: open(allure_zip, 'rb')
    })

    if os.path.isfile(allure_zip):
        os.remove(allure_zip)
    else:
        print("Error: %s archive was not found" % allure_zip)
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

export default PythonExample
