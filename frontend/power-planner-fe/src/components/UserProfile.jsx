import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import "../styles/userprofile.css";
import { MdHealthAndSafety } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { GiBrain } from "react-icons/gi";
import { getToday } from "../utils/daysAndDates";
import { CiCircleInfo } from "react-icons/ci";

const UserProfile = ({ taskList }) => {
  const { userDetails } = useContext(AuthContext);
  const [taskCount, setTaskCount] = useState({ totalToday: 0, completed: 0 });
  const [hoverXP, setHoverXP] = useState(false);
  const [hoverTasks, setHoverTasks] = useState(false);

  useEffect(() => {
    const today = getToday();
    const tasksToday = [];
    let completedToday = 0;

    for (const element of taskList) {
      if (element.taskRepeatsOn.includes(today)) {
        tasksToday.push(element);
        if (element.isCompleted) completedToday += 1;
      }
    }
    setTaskCount({ totalToday: tasksToday, completed: completedToday });
  }, [taskList]);

  return (
    <>
      <button
        className="user-details"
        onClick={() => document.getElementById("user-legend").showModal()}
      >
        {/* MAIN BAR */}
        <div className="avatar-user-lvl flex">
          <div className="avatar self-center">
            <div className="w-10 h-10 rounded-full mr-1">
              <img
                alt="avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="user-lvl">
            <h1 className="text-black">{userDetails.username || "robot"}</h1>

            <h1>lvl {userDetails.lvl || 0} </h1>
          </div>
        </div>
        <div className="xpbar">
          <CiCircleInfo
            className="inline info-xp"
            onMouseEnter={() => setHoverXP(true)}
            onMouseLeave={() => setHoverXP(false)}
          />
          {hoverXP && <div className="hover-text-xp">xp bar</div>}

          <progress
            className="progress progress-success w-24"
            value={userDetails.xp || 0}
            max={userDetails.nextXP || 0}
          ></progress>
          <br />
          <CiCircleInfo
            className="inline info-tasks"
            onMouseEnter={() => setHoverTasks(true)}
            onMouseLeave={() => setHoverTasks(false)}
          />
          {hoverTasks && <div className="hover-text-tasks">progress today</div>}
          <progress
            className="progress progress-error w-24"
            value={taskCount.completed || 0}
            max={taskCount.totalToday.length || 0}
          ></progress>
        </div>
      </button>

      {/* MODAL */}
      <dialog id="user-legend" className="modal">
        <div className="modal-box">
          {/* LEGEND */}
          <div className="user-profile-modal flex flex-col lg:flex-row justify-between">
            <div className="left-profile">
              <div className="avatar-main flex">
                {/* AVATAR */}
                <div
                  className="w-14
                 h-14
                 rounded-full mr-1"
                >
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    className="rounded-full"
                  />
                </div>
                {/* Name */}
                <div className="lvl-rank">
                  <span> {userDetails.rank || "Recruit"}</span>
                  <br />
                  <span> LEVEL {userDetails.lvl || 0}</span>
                </div>
              </div>
              <div className="progress-bar">
                <progress
                  className="progress progress-success w-36"
                  value={userDetails.xp || 0}
                  max={userDetails.nextXP || 0}
                ></progress>
                <br />

                <br />
                <div className="xps w-40">
                  <span>{userDetails.xp || 0}</span>
                  <span>{userDetails.nextXP || 0}</span>
                </div>
              </div>
            </div>
            <div className="right-profile m-auto mt-4">
              <div className="points">
                <div className="xp flex justify-around">
                  <label htmlFor="xp">XP</label>
                  <span> {userDetails.xp || 0}</span>
                </div>
                <div className="hp flex justify-around">
                  <MdHealthAndSafety className="text-3xl text-red-800" />
                  <span> {userDetails.hp || 0}</span>
                </div>
                <div className="wp flex justify-around">
                  <RiMoneyDollarCircleFill className="text-3xl text-green-700" />

                  <span> {userDetails.wp || 0}</span>
                </div>
                <div className="kp flex justify-around">
                  <GiBrain className="text-3xl text-pink-500" />
                  <span> {userDetails.kp || 0}</span>
                </div>
              </div>
            </div>
          </div>
          {/* LEGEND END */}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default UserProfile;
