const express = require('express');
const { getDailyTasks, addDailyTask } = require('../controllers/taskController');
const router = express.Router();

router
.route('/')
.get(getDailyTasks)
.post(addDailyTask)

router
.route('/:id')

module.exports = router;
