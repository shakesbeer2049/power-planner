import TasksToday from "./TasksOnDayX";
import { isDateInCurrentWeek } from "../utils/daysAndDates";
import { useContext } from "react";

import TaskContext from "../context/TaskContext";

const WeeklyTasks = () => {
  const { taskList, handleTaskUpdate } = useContext(TaskContext);

  console.log("tasks", taskList);

  const thisWeekTasks = taskList.filter((task) =>
    isDateInCurrentWeek(task.createdOn)
  );
  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-[2.5rem] mb-0 weekly-heading">
        Weekly Tasks
      </h1>
      <TasksToday
        handleTaskUpdate={handleTaskUpdate}
        taskList={thisWeekTasks}
        weekDay={"Monday"}
      />
      <TasksToday
        handleTaskUpdate={handleTaskUpdate}
        taskList={thisWeekTasks}
        weekDay={"Tuesday"}
      />
      <TasksToday
        handleTaskUpdate={handleTaskUpdate}
        taskList={thisWeekTasks}
        weekDay={"Wednesday"}
      />
      <TasksToday
        handleTaskUpdate={handleTaskUpdate}
        taskList={thisWeekTasks}
        weekDay={"Thursday"}
      />
      <TasksToday
        handleTaskUpdate={handleTaskUpdate}
        taskList={thisWeekTasks}
        weekDay={"Friday"}
      />
      <TasksToday
        handleTaskUpdate={handleTaskUpdate}
        taskList={thisWeekTasks}
        weekDay={"Saturday"}
      />
      <TasksToday
        handleTaskUpdate={handleTaskUpdate}
        taskList={thisWeekTasks}
        weekDay={"Sunday"}
      />
    </>
  );
};

export default WeeklyTasks;
