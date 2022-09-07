export const installations = `
\`\`\`python
pip install requests
\`\`\`
`

export const pyCode = `
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

export const runScriptAfterTests = `
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