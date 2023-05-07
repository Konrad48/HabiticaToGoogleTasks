const CALENDAR_ID = 'example@gmail.com';    // Your Id of calendar, most probably your gmail username
const TASK_LIST_ID = 'tasklistId';  //Your task list Id

function listGoogleTasks() {
  try {
    const tasks = Tasks.Tasks.list(TASK_LIST_ID, { showHidden: true });
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
    task = Tasks.Tasks.patch(task,TASK_LIST_ID, updateOptions.id)
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
    task = Tasks.Tasks.insert(task, TASK_LIST_ID);
    console.log('Task with ID "%s" was created.', task.id);
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



