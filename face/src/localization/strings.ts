import LocalizedStrings from 'react-localization';
import {IStrings} from "./localization.types";
import {RuJsExample, RuPythonExample, EnJsExample, EnPythonExample} from "../components/examples";

export const strings: IStrings = new LocalizedStrings({
  en: {
    language: "English",
    examples: {
      jsExample: EnJsExample,
      pythonExample: EnPythonExample,
    },
    projectsHeader: {
      description: "Project",
      time: "Test time",
      lastRun: "Last run",
      passed: "passed",
      failed: "failed",
      broken: "broken",
      skipped: "skipped",
      total: "total",
      statistics: "Statistics",
      errorMessage: "Something went wrong...",
    },
    header: {
      main: "Reports list",
      examples: "Examples",
      pageTitle: "Reports Hub",
      newProject: "Add new project",
    },
    mainPage: {
      filterTitle: "Chose platform",
    },
    project: {
      description: "Description",
      project: "Project",
      platform: "Platform",
      entrypoint: "Entrypoint",
      reportType: "Reports type",
      htmlUpload: "Archive with reports",
      allureUpload: "Archive with allure-results",
      loading: "Loading..."
    },
    modal: {
      title: "Deletion confirmation",
      text: "Deleting a project",
    },
    buttons: {
      delete: "Delete",
      submit: "Submit",
    },
    messages: {
      createNewProjectError: "Could not create new project",
      deleteProjectError: "Could not delete project",
      deleteProjectSuccess: "Project {project} was successfully deleted",
      fileUploadSuccess: "File uploaded. Report will appear on website after generation",
      fileUploadError: "An error occurred while uploading the file, try again or select another file. Error",
      notFound: "Page not found",
    },
  },
  ru: {
    language: "Русский",
    examples: {
      jsExample: RuJsExample,
      pythonExample: RuPythonExample,
    },
    projectsHeader: {
      description: "Проект",
      time: "Время теста",
      lastRun: "Запуск",
      passed: "passed",
      failed: "failed",
      broken: "broken",
      skipped: "skipped",
      total: "total",
      statistics: "Статистика",
      errorMessage: "Что-то пошло не так...",
    },
    header: {
      main: "Список отчетов",
      examples: "Примеры",
      pageTitle: "Сервер отчетов",
      newProject: "Новый проект",
    },
    mainPage: {
      filterTitle: "Выберите платформу",
    },
    project: {
      description: "Описание проекта",
      project: "Проект",
      platform: "Платформа",
      entrypoint: "HTML файл",
      reportType: "Тип отчета",
      htmlUpload: "Архив с html отчетом",
      allureUpload: "Архив с allure-results",
      loading: "Загрузка...",
    },
    modal: {
      title: "Подтверждение удаления",
      text: "Удаление проекта",
    },
    buttons: {
      delete: "Удалить",
      submit: "Отправить",
    },
    messages: {
      createNewProjectError: "Не получилось создать новый проект",
      deleteProjectError: "Не удалось удалить проект",
      deleteProjectSuccess: "Проект {project} был успешно удален",
      fileUploadSuccess: "Файл загружен. Отчет появится на сайте после генерации. Необходимо обновить страницу",
      fileUploadError: "При загрузке файла произошла ошибка, попробуйте еще раз позже или выберети другой файл. Ошибка",
      notFound: "Страница не найдена",
    },
  },
});
