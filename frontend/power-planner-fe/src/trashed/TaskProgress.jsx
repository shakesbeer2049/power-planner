import { useEffect, useState, useContext } from "react";
import { calculateDailyProgress } from "../utils/taskCalculations";
import TaskContext from "../context/TaskContext";

const TaskProgress = ({ title }) => {
  const { taskList } = useContext(TaskContext);
  const [dailyProgressCount, setDailyProgressCount] = useState(0);
  useEffect(() => {
    const percentCompleted = calculateDailyProgress(taskList);
    setDailyProgressCount(percentCompleted);
  }, [taskList]);
  return (
    <>
      <h4 className="mb-2 text-center lg:mt-16">{title}</h4>
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
