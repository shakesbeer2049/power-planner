import { useContext, useState } from "react";
import { getYears, months } from "../utils/daysAndDates";
import TaskContext from "../context/TaskContext";

export default Performance = () => {
  const { taskList } = useContext(TaskContext);
  const years = getYears();

  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);

  const handleYearSelect = (e) => {
    console.log(e.target.value);
    setYear(e.target.value);
  };

  const handleMonthSelect = (e) => {
    setMonth(e.target.value);
  };

  const makeMonthlyData = () => {
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
    // get the tasks created this year
    const tasksThisYear = taskList.filter((task) =>
      task.createdOn.includes(year)
    );

    const monthlyTasksArray = Array.from({ length: 12 }, () => []);

    if (tasksThisYear) {
      tasksThisYear.forEach((task) => {
        const month = new Date(task.createdOn).getMonth();
        console.log("month", month);
        monthlyTasksArray[month].push(task);
      });
    }

    const monthlyJsx = monthlyTasksArray.map((monthTasks, index) => {
      const totalTasksThisMonth = monthTasks.length;
      if (totalTasksThisMonth) {
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
      }
    });
    console.log("monthlyTasksArray", monthlyTasksArray);
    return monthlyJsx;
  };

  return (
    <>
      <div className="tasks-today text-left mt-16 m-1 lg:mt-0">
        <h1 className="text-3xl font-bold text-center">Performance Review</h1>

        <div className="data-container">
          <div className="dropdown-selectors flex justify-between w-3/4 m-auto">
            <select
              className="select select-primary w-fit max-w-xs"
              onChange={handleYearSelect}
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
                      <th>Month</th>
                      <th>Completed</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    <tr>
                      <td>Cy Ganderton</td>
                      <td>Quality Control Specialist</td>
                      <td>Blue</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                      <td>Hart Hagerty</td>
                      <td>Desktop Support Technician</td>
                      <td>Purple</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <td>Brice Swyre</td>
                      <td>Tax Accountant</td>
                      <td>Red</td>
                    </tr>
                  </tbody>
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
