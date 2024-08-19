import { useContext, useEffect, useState } from "react";
import TaskContext from "../context/TaskContext";
import "../styles/stats.css";
import Card from "./Card";
import { getTotalAndCompletedTasks } from "../utils/taskCalculations";

const Stats = () => {
  const { taskList } = useContext(TaskContext);

  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [achievedPercent, setAchievedPercent] = useState(0);

  useEffect(() => {
    const { totalTasks, completedTasks } = getTotalAndCompletedTasks(taskList);
    setTotalTasks(totalTasks);
    setCompletedTasks(completedTasks);
    setAchievedPercent(((completedTasks / totalTasks) * 100).toFixed(1));
  }, [taskList]);

  return (
    <div className="dashboard-div">
      <h1 className="text-center text-2xl pt-8">Performance Analysis</h1>

      <div className="performace">
        <div className="cards-div">
          <Card title={"Total Tasks"} data={totalTasks} />
          <Card title={"Completed"} data={completedTasks} />
          <Card title={"Achievement"} data={`${achievedPercent}%`} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
