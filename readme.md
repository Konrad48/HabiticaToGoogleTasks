# Habitica To Google Tasks
Purpose of this script is to synchronize Habitica To-Dos with google tasks. Therefore making the tasks visible in calendar.
Ingeration is one way, that means tasks in dedicated google task list should not be modified.
## Usage
This script is ment to be implemented as google apps script:
https://script.google.com/home
You should put the files in your project's folder, and fill all the needed credentials:
- habiticaToken
- habiticaId
- taskListName (name of your task list in Google Tasks)

Your habitica user Id and habitica Token can be found here https://habitica.com/user/settings/api
You will also need to add `Tasks` service to script and authorize access to your google calendar by the script.
Set automation to run mainFaunction in index.gs in some time interval. For me, every 5 min is enough.


### Mentions
This script was inspired by: https://github.com/davicedraz/habitica-google-calendar