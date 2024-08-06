import { useContext, useEffect, useState } from "react";
import TaskContext from "../context/TaskContext";

const TaskProgress = ({ title }) => {
  const { dailyProgressCount } = useContext(TaskContext);
  const [completedPercent, setCompletedPercent] = useState(null);

  useEffect(() => {
    setCompletedPercent(
      (dailyProgressCount.completedTasks / dailyProgressCount.totalCount) * 100
    );
  }, [dailyProgressCount]);

  return (
    <>
      <h4 className="mb-2 text-center">{title}</h4>
      <div
        className="radial-progress text-teal-500"
        style={{ "--value": completedPercent }}
        role="progressbar"
      >
        {completedPercent}%
      </div>
    </>
  );
};

export default TaskProgress;
