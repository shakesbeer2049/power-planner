import { useEffect, useState } from "react";

import "../styles/stats.css";
import Card from "./Card";
import { getTotalAndCompletedTasks } from "../utils/taskCalculations";

const Stats = ({taskList}) => {

  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [achievedPercent, setAchievedPercent] = useState(0);
  const [selectedStat, setSelectedStat] = useState("overall");

  useEffect(() => {
    const { totalTasks, completedTasks } = getTotalAndCompletedTasks(taskList);
    setTotalTasks(totalTasks);
    setCompletedTasks(completedTasks);
    setAchievedPercent(((completedTasks / totalTasks) * 100).toFixed(1));
  }, [taskList]);

  return (
    <div className="dashboard-div">
      <h1 className="text-center text-2xl">Stats</h1>
      <ul className="menu menu-horizontal lg:menu-horizontal bg-base-200 rounded-box ml-8">
        <li
          className={selectedStat === "overall" ? "selected-stat" : ""}
          onClick={() => {
            setSelectedStat("overall");
          }}
        >
          <a>Overall</a>
        </li>
        <li
          className={selectedStat === "daily" ? "selected-stat" : ""}
          onClick={() => {
            setSelectedStat("daily");
          }}
        >
          <a>Daily</a>
        </li>
        <li
          className={selectedStat === "weekly" ? "selected-stat" : ""}
          onClick={() => {
            setSelectedStat("weekly");
          }}
        >
          <a>Weekly</a>
        </li>
        <li
          className={selectedStat === "yearly" ? "selected-stat" : ""}
          onClick={() => {
            setSelectedStat("yearly");
          }}
        >
          <a>Yearly</a>
        </li>
      </ul>
      <div className="performance">
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
