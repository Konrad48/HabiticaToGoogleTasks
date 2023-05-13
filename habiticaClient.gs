const habTaskURL = "https://habitica.com/api/v3/tasks/";
const habiticaId = PropertiesService.getScriptProperties().getProperty('habiticaId');
const habiticaToken = PropertiesService.getScriptProperties().getProperty('habiticaToken');

const templateParams = {
  _post: {
    method: "post",
    headers: { "x-api-user": habiticaId, "x-api-key": habiticaToken },
  },
  _get: {
    contentType: "application/json",
    method: "get",
    headers: { "x-api-user": habiticaId, "x-api-key": habiticaToken },
  },
  _delete: {
    method: "delete",
    headers: { "x-api-user": habiticaId, "x-api-key": habiticaToken },
  },
};

function getAllTasks() {
  const existingTasks = fetchExistingTasks(habTaskURL, templateParams);
  const completedTasks = fetchCompletedTasks(
    habTaskURL,
    templateParams
  );
  const filteredCompleted = filterCompletedByDate(completedTasks.data, 10);
  return existingTasks.data.concat(filteredCompleted);
}

function fetchExistingTasks(habTaskURL, templateParams) {
  const response = UrlFetchApp.fetch(
    habTaskURL + "user?type=todos",
    templateParams._get
  );
  return JSON.parse(response.getContentText());
}

function fetchCompletedTasks(habTaskURL, templateParams) {
  const response = UrlFetchApp.fetch(
    habTaskURL + "user?type=completedTodos",
    templateParams._get
  );
  return JSON.parse(response.getContentText());
}

function filterCompletedByDate(completedTasks, daysBack) {
  return completedTasks.filter((task) => {
    const dateCompleted = new Date(task.dateCompleted)
    const borderDate = new Date();
    borderDate.setDate(borderDate.getDate() - daysBack);
    return dateCompleted > borderDate;
  })
}

