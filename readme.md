# Allure-server

Сервер Allure-отчетов для направления itv

## Запросы
>`/api/allure/info` - список отчетов и проектов

>`/api/allure/project` - создание проекта. \
>Тело запроса: `{"project": "stb", "description": "Тесты стб", "platform": "stb" }`
>
>>В `project` допускаются только латинские символы и тире. Соответствует папке, в которой будет храниться аллюр-отчет. Поэтому сперва лучше проверить, что проекта с таким названием еще не заводили.  \
>>Если такой проект уже существует, то allure-results будут разархивированы в ту же папку и отчеты смержатся после генерации.
>>
>>В `platform` допускаются только латинские символы и тире. Используется для фильтрации. 
>>
>>В `description` задается короткое описание проекта, например `"Тесты портала"`.

>`/api/allure/upload` - загрузка архива с отчетом

>`/api/allure/remove_project` - удаление проекта и всех данных \
>Тело запроса `{ "project": "stb" }`

### Технологии

Express https://expressjs.com/ru/api.html

React https://reactjs.org/

### Обновление докер-образа

Сперва нужно удалить старый образ: 

>`docker ps` (`-a`, если контейнер был остановлен) - список запущенных контейнеров

>`docker images` - список образов

>`docker stop <container id> && docker rm <container id> && docker rmi <image id>` - удаляем старые контейнер и образ (registry.itv.restr.im:5000/itv-site/web-base/allure-server)

Запускаем новый контейнер:
```
docker run -it --network=host \
-v /Users/ramisvakazov/projects/allure-server/uploads:/apps/allure-server/uploads \
-v /Users/ramisvakazov/projects/allure-server/allure-report:/apps/allure-server/allure-reports \
-v /Users/ramisvakazov/projects/allure-server/db:/apps/allure-server/db \
-p 5005:5005 --privileged \
-e NODE_ENV=production \
registry.itv.restr.im:5000/itv-site/web-base/allure-server
```