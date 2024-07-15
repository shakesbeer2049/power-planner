const express = require('express');
const { getDailyTasks } = require('./controllers/taskController');
const taskRouter = require('./routes/taskRouter')
const app = express();
app.use(express.json());

app.use('/api/v1/tasks',taskRouter)

app.listen(3000, () => {
    console.log("listening on port 3000");
})