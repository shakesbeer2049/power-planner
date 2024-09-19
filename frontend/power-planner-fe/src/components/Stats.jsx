import { useEffect, useState, useContext } from "react";

import "../styles/stats.css";
import Card from "./Card";
import { generateStats } from "../utils/taskCalculations";
import { callApi } from "../utils/callApi";

const Stats = () => {
  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    const fetchAllTasks = async () => {
      const res = await callApi("/tasks/all", "GET", {});
      setTaskList(res.data.tasks);
    };
    fetchAllTasks();
  }, []);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    achievedPercent: 0,
  });
  const [selectedStat, setSelectedStat] = useState("overall");

  useEffect(() => {
    const { totalTasks, completedTasks, achievedPercent } = generateStats(
      taskList,
      selectedStat
    );
    setStats({ totalTasks, completedTasks, achievedPercent });
  }, [taskList, selectedStat]);

  return (
    <div className="dashboard-div">
      <h1 className="text-3xl font-bold text-center mt-[2.5rem]">Stats</h1>
      <ul className="menu menu-horizontal justify-center lg:menu-horizontal bg-base-200 rounded-box ml-8">
        <li
          className={selectedStat === "overall" ? "selected-stat" : ""}
          onClick={() => {
            setSelectedStat("overall");
          }}
        >
          <a>Overall</a>
        </li>
        <li
          className={selectedStat === "weekly" ? "selected-stat" : ""}
          onClick={() => {
            setSelectedStat("weekly");
          }}
        >
          <a>This Week</a>
        </li>
        <li
          className={selectedStat === "yearly" ? "selected-stat" : ""}
          onClick={() => {
            setSelectedStat("yearly");
          }}
        >
          <a>This Year</a>
        </li>
      </ul>
      <div className="performance">
        <div className="cards-div">
          <Card title={"Total Tasks"} data={stats.totalTasks} />
          <Card title={"Completed"} data={stats.completedTasks} />
          <Card title={"Achievement"} data={`${stats.achievedPercent}%`} />
        </div>
      </div>
    </div>
  );
};

export default Stats;
