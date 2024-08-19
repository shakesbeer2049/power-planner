import { useContext } from "react";
import TaskContext from "../context/TaskContext";
import TasksToday from "./TasksOnDayX";
import { isDateInCurrentWeek } from "../utils/daysAndDates";

const WeeklyTasks = ({}) => {
  const { taskList } = useContext(TaskContext);
  const thisWeekTasks = taskList.filter(task => isDateInCurrentWeek(task.date))
  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-14 mb-0">
        Weekly Tasks
      </h1>
      <TasksToday taskList={thisWeekTasks} weekDay={"Monday"} />
      <TasksToday taskList={thisWeekTasks} weekDay={"Tuesday"} />
      <TasksToday taskList={thisWeekTasks} weekDay={"Wednesday"} />
      <TasksToday taskList={thisWeekTasks} weekDay={"Thursday"} />
      <TasksToday taskList={thisWeekTasks} weekDay={"Friday"} />
      <TasksToday taskList={thisWeekTasks} weekDay={"Saturday"} />
      <TasksToday taskList={thisWeekTasks} weekDay={"Sunday"} />
    </>
  );
};

export default WeeklyTasks;
