
import TasksToday from "./TasksOnDayX";
import { isDateInCurrentWeek } from "../utils/daysAndDates";

const WeeklyTasks = ({taskList, handleTaskUpdate }) => {
  const thisWeekTasks = taskList.filter((task) =>
    isDateInCurrentWeek(task.createdOn)
  );
  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-14 mb-0 weekly-heading lg:mt-0 mb-6 mt-5">
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
