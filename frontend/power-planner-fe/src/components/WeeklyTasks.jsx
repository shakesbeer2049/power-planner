import TasksToday from "./TasksOnDayX";

const WeeklyTasks = ({ taskList }) => {
  return (
    <>
      <h1 text-3xl font-bold text-center>
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
