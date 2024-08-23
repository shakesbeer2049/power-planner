import { getYears, months } from "../utils/daysAndDates";

export default Performance = () => {
  const years = getYears();
 
  return (
    <>
      <div className="tasks-today text-left mt-16 m-1 lg:mt-0">
        <h1 className="text-3xl font-bold text-center">Performance Review</h1>

        <div className="data-container">
          <div className="dropdown-selectors flex justify-between w-3/4 m-auto">
            <select className="select select-primary w-fit max-w-xs">
              <option disabled selected>
                Select Year
              </option>
              {years.map(ye => <option key={ye} >{ye}</option>)}
            </select>
            <select className="select select-primary w-fit max-w-xs">
              <option disabled selected>
               Select Month
              </option>
              {months.map(mon => <option key={mon} >{mon}</option>)}
            </select>
          </div>
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
        </div>
      </div>
    </>
  );
};
