const HABITICA_TOKEN = "habiticaToken"; //Your habitica token. Can be acquired here: https://habitica.com/user/settings/api
const HABITICA_ID = "habiticaId";   //Your habitica user Id. Can be acquired here: https://habitica.com/user/settings/api
const habTaskURL = "https://habitica.com/api/v3/tasks/";

const templateParams = {
  _post: {
    method: "post",
    headers: { "x-api-user": HABITICA_ID, "x-api-key": HABITICA_TOKEN },
  },
  _get: {
    contentType: "application/json",
    method: "get",
    headers: { "x-api-user": HABITICA_ID, "x-api-key": HABITICA_TOKEN },
  },
  _delete: {
    method: "delete",
    headers: { "x-api-user": HABITICA_ID, "x-api-key": HABITICA_TOKEN },
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

