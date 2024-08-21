import {useEffect, useState } from "react";
import { calculateDailyProgress } from "../utils/taskCalculations";

const TaskProgress = ({ title, taskList }) => {
  const [dailyProgressCount, setDailyProgressCount] = useState(0);
  useEffect(() => {
    console.log("Rerender in Task Progress Comp");
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
