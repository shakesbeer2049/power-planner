import { useContext, useEffect, useState } from "react";
import TaskContext from "../context/TaskContext";
import { calculateDailyProgress } from "../utils/taskCalculations";

const TaskProgress = ({ title }) => {
  const { taskList } = useContext(TaskContext);
  const [dailyProgressCount, setDailyProgressCount] = useState(0);


  useEffect(() => {
    console.log(taskList, "inside progress calc")
     const percentCompleted = calculateDailyProgress(taskList);
        setDailyProgressCount(percentCompleted);
  }, [taskList]);
  return (
    <>
      <h4 className="mb-2 text-center">{title}</h4>
      <div
        className="radial-progress text-teal-500"
        style={{ "--value": dailyProgressCount }}
        role="progressbar"
      >
        {dailyProgressCount}%
      </div>
    </>
  );
};

export default TaskProgress;
