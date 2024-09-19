import { useContext, useEffect, useState } from "react";
import { getYears, months, getWeekOfMonth } from "../utils/daysAndDates";
import TaskContext from "../context/TaskContext";
import { callApi } from "../utils/callApi";

export default Performance = () => {
  // const { taskList } = useContext(TaskContext);
  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    const fetchAllTasks = async () => {
      const res = await callApi("/tasks/all", "GET", {});
      setTaskList(res.data.tasks);
    };
    fetchAllTasks();
  }, []);
  const years = getYears();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [year, setYear] = useState(years[years.length - 1]);
  const [month, setMonth] = useState(null);

  const handleYearSelect = (e) => {
    setYear(e.target.value);
  };

  const handleMonthSelect = (e) => {
    setMonth(e.target.value);
  };

  const makeMonthlyData = () => {
    // get the tasks created this year
    const tasksThisYear = taskList.filter((task) =>
      task.createdOn.includes(year)
    );

    const monthlyTasksArray = Array.from({ length: 12 }, () => []);

    if (tasksThisYear) {
      tasksThisYear.forEach((task) => {
        const month = new Date(task.createdOn).getMonth();
        monthlyTasksArray[month].push(task);
      });
    }

    const monthlyJsx = monthlyTasksArray.map((monthTasks, index) => {
      const totalTasksThisMonth = monthTasks.length;

      const completed = monthTasks?.filter((task) => task.isCompleted).length;

      return (
        <>
          <tr>
            <td className="font-bold">{monthNames[index]}</td>
            <td className="font-bold">
              {completed} out of {totalTasksThisMonth}
            </td>
            <td>
              <progress
                className="progress progress-primary w-28"
                value={completed}
                max={totalTasksThisMonth}
              ></progress>
            </td>
          </tr>
        </>
      );
    });
    return monthlyJsx;
  };

  const makeWeeklyData = () => {
    const monthIndex = monthNames.indexOf(month); // Get the index of the month

    if (monthIndex === -1) {
      console.error("Invalid month name provided");
      return;
    }

    // Get the tasks created in the specified month of this year
    const tasksThisMonth = taskList.filter((task) => {
      const taskDate = new Date(task.createdOn);

      return (
        taskDate.getFullYear() == year && taskDate.getMonth() == monthIndex
      );
    });
    // Initialize an array for the weeks in the selected month (maximum of 6 weeks)
    const weeklyTasksArray = Array.from({ length: 5 }, () => []);

    // Function to calculate which week of the month the task belongs to
    const getWeekOfMonth = (date) => {
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const dayOfMonth = date.getDate();
      const firstDayOfWeek = firstDayOfMonth.getDay(); // Day of the week the month starts on
      const adjustedDayOfMonth = dayOfMonth + firstDayOfWeek;
      return Math.ceil(adjustedDayOfMonth / 7);
    };

    if (tasksThisMonth.length > 0) {
      tasksThisMonth.forEach((task) => {
        const taskDate = new Date(task.createdOn);
        const week = getWeekOfMonth(taskDate) - 1; // Zero-based index for the week
        weeklyTasksArray[week].push(task);
      });
    }

    // Create JSX for the selected month's weekly data
    const weeklyJsx = weeklyTasksArray.map((weekTasks, weekIndex) => {
      const completed = weekTasks.filter((task) => task.isCompleted).length;

      return (
        <tr key={weekIndex}>
          <td className="font-bold">Week {weekIndex + 1}</td>
          <td className="font-bold">
            {completed} out of {weekTasks.length}
          </td>
          <td>
            <progress
              className="progress progress-primary w-28"
              value={completed}
              max={weekTasks.length}
            ></progress>
          </td>
        </tr>
      );

      return null;
    });

    return weeklyJsx;
  };

  return (
    <>
      <div className="tasks-today text-left mt-2 m-1">
        <h1 className="text-3xl font-bold text-center mt-[2.5rem]">Performance Review</h1>

        <div className="data-container">
          <div className="dropdown-selectors flex justify-between w-3/4 m-auto">
            <select
              className="select select-primary w-fit max-w-xs mr-2"
              onChange={handleYearSelect}
              value={year}
            >
              <option disabled selected>
                Select Year
              </option>
              {years.map((ye) => (
                <option key={ye}>{ye}</option>
              ))}
            </select>
            <select
              className="select select-primary w-fit max-w-xs"
              onChange={handleMonthSelect}
            >
              <option disabled selected>
                Select Month
              </option>
              {months.map((mon) => (
                <option key={mon}>{mon}</option>
              ))}
            </select>
          </div>
          {/* BLANK */}
          {!year && !month ? (
            <h1 className="text-xl mt-8 font-bold text-center">
              Please Select A Year
            </h1>
          ) : (
            ""
          )}

          {/* YEAR */}
          {year && !month ? (
            <div className="data-table">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th className="text-lg">Month</th>
                      <th className="text-lg">Completed</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{makeMonthlyData()}</tbody>
                </table>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* YEAR AND MONTH */}

          {year && month ? (
            <div className="data-table">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th className="text-lg">Month</th>
                      <th className="text-lg">Completed</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{makeWeeklyData()}</tbody>
                </table>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
