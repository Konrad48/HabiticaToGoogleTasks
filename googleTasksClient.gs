const calendarId = PropertiesService.getScriptProperties().getProperty('calendarId');
const taskListId = getTaskListId()

function getTaskListId() {
  const taskListName = PropertiesService.getScriptProperties().getProperty('taskListName');
  const taskLists = Tasks.Tasklists.list();
  return taskLists.items.find(el => el.title === taskListName).id;
}

function listGoogleTasks() {
  try {
    const tasks = Tasks.Tasks.list(taskListId, { showHidden: true });
    if (!tasks.items) {
      console.log('No tasks found.');
      return;
    }
    return tasks.items;
  } catch (err) {
    console.log('Failed with an error %s', err.message);
  }
}

function updateGoogleTask(updateOptions) {
  let task = {
    title: updateOptions.title,
    due: updateOptions.dueDate,
    status: updateOptions.completed ? 'completed' : 'needsAction',
  };
  try {
    task = Tasks.Tasks.patch(task,taskListId, updateOptions.id)
    console.log('Task with ID "%s" was updated.', updateOptions.id);
  } catch (err) {
    console.log('Failed with an error %s', err.message);
  }
}

function createGoogleTask(title, notes, date) {
  let task = {
    title,
    notes,
    date,
  };
  try {
    task = Tasks.Tasks.insert(task, taskListId);
    console.log('Task with ID "%s" was created.', task.id);
  } catch (err) {
    console.log('Failed with an error %s', err.message);
  }
}

function deleteGoogleTask(id) {
  try {
    task = Tasks.Tasks.remove(taskListId, id);
    console.log('Task with ID "%s" was deleted.', id);
  } catch (err) {
    console.log('Failed with an error %s', err.message);
  }
}

function filerTasksByDate(tasks, date) {
  const searchDateString = date.toISOString().split('T')[0];
  if (!searchDateString) {
    throw new Error('[ERROR] Cannot parse search date');
  }
  return tasks.filter((el) => {
    if (!el.due) {
      return false;
    }
    const taskDate = new Date(el.due);
    const taskDateString = taskDate.toISOString().split('T')[0]
    if (searchDateString !== taskDateString) {
      return false;
    }
    return true;
  });
}



