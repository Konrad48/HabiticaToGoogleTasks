function mainFunction() {
  PropertiesService.getScriptProperties().setProperties({
    habiticaToken: "exampleToken123456",  //replace with your habitica Token
    habiticaId: "exampleHabiticaId123456",  //replace with your habitica ID
    taskListName: 'HabiticaTasksList', // replace with name of your tasks list
  });

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
      (
        new Date(habiticaTask.date).toDateString() === new Date(connectedGoogleTask.due).toDateString() ||
        (habiticaTask.date === null && connectedGoogleTask.due === undefined)
      ) &&
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


  for (rawGoogleTask of rawGoogleTasks) {
    const connectedHabiticaTask = allHabiticaTasks.find((task) => task.id === rawGoogleTask.notes)
    if (connectedHabiticaTask === undefined) {
      deleteGoogleTask(rawGoogleTask.id);
    }
  }
}
