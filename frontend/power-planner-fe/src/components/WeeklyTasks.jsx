import { useContext } from "react";
import TaskContext from "../context/TaskContext";
import TasksToday from "./TasksOnDayX";

const WeeklyTasks = ({}) => {
  const { taskList } = useContext(TaskContext);
  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-14 mb-0">
        Weekly Tasks
      </h1>
      <TasksToday taskList={taskList} weekDay={"Monday"} />
      <TasksToday taskList={taskList} weekDay={"Tuesday"} />
      <TasksToday taskList={taskList} weekDay={"Wednesday"} />
      <TasksToday taskList={taskList} weekDay={"Thursday"} />
      <TasksToday taskList={taskList} weekDay={"Friday"} />
      <TasksToday taskList={taskList} weekDay={"Saturday"} />
      <TasksToday taskList={taskList} weekDay={"Sunday"} />
    </>
  );
};

export default WeeklyTasks;
