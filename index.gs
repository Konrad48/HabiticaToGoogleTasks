function mainFunction() {
  const allHabiticaTasks = getAllTasks();
  const rawGoogleTasks = listGoogleTasks();
  for (habiticaTask of allHabiticaTasks) {
    if (habiticaTask === undefined) {
      continue;
    }
    const connectedGoogleTask = rawGoogleTasks.find((task) => task.notes === habiticaTask.id);
    if (connectedGoogleTask === undefined) {
      if (!habiticaTask.completed) {
        createGoogleTask(habiticaTask.text, habiticaTask.id, habiticaTask.date);
      }
      continue;
    }
    if (
      habiticaTask.text === connectedGoogleTask.title &&
      new Date(habiticaTask.date).getDate() === new Date(connectedGoogleTask.due).getDate() &&
      habiticaTask.completed === (connectedGoogleTask.status === 'completed')
    ) {
      console.log(`Task with ID ${connectedGoogleTask.id} is up to date`)
      continue;
    }
    updateGoogleTask({
      id:connectedGoogleTask.id, 
      title: habiticaTask.text, 
      dueDate: habiticaTask.date,
      completed: habiticaTask.completed,
      });
  }
}