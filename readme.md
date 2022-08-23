# Reports hub

Reports hub (now only for allure reports)

## Requests
>`/api/allure/info` - list of reports

>`/api/allure/project` - creating project. \
>Body: `{"project": "website", "description": "Website e2e tests", "platform": "Website", type: "allure" | "html", entrypoint: "Extent.html"}`
>
>>In the `project` could be only latin symbols and '-'. It must be equal to the folder there will be placed reports.  \
>>If project with this name is already exists, allure-results will be extracted to the same folder and merged with the existing.
>>
>>In the `platform` could be only latin symbols and '-'. It used for filtering and grouping.
>>
>>In the `description` you could add short description of the project, for example`"Website e2e tests"`.
>>
>> It `type` you should specify your reports type: "allure" | "html". And if reports are html, you should also specify its entrypoint. Note, that if html file starts with the uppercase letter, you should use the same letter in entrypoint field.

>`/api/allure/upload` - uploading a report, key of the file should be the same as project name

>`/api/allure/remove_project` - it deleting project and all its datas \
>Body `{ "project": "website" }`

### Using technologies

Express https://expressjs.com/ru/api.html

React https://reactjs.org/

Redux-toolkit + rtk-query https://redux-toolkit.js.org/

### Updating docker image

Firstly you should delete old image:

>`docker ps` (`-a`, if container was stopped) - the list of running containers

>`docker images` - list of images

>`docker stop <container id> && docker rm <container id> && docker rmi <image id>` - removing old container and image

Running new container:
```
docker run -it --network=host \
-v /Users/ramisvakazov/projects/allure-server/uploads:/apps/allure-server/uploads \
-v /Users/ramisvakazov/projects/allure-server/allure-report:/apps/allure-server/allure-reports \
-v /Users/ramisvakazov/projects/allure-server/db:/apps/allure-server/db \
-p 5005:5005 --privileged \
-e NODE_ENV=production \
<image_name>
```