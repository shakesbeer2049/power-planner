import React, { useState } from "react";

const MultiSelect = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false); // Dropdown visibility
  const [selectedOptions, setSelectedOptions] = useState([]); // Selected options

  // Toggle dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle option selection
  const handleSelect = (option) => {
    if (selectedOptions.includes(option)) {
      // Deselect option
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      // Select option
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="multi-select-dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOptions.length > 0 ? (
          <div className="selected-tags">
            {selectedOptions.map((option) => (
              <span key={option} className="tag">
                {option}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent dropdown toggle
                    handleSelect(option);
                  }}
                  className="tag-close"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        ) : (
          "Select options"
        )}
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {options.map((option) => (
            <div
              key={option}
              className={`dropdown-item ${
                selectedOptions.includes(option) ? "selected" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;

// import { useState } from "react";

// const MultiSelect = () => {
//   const [showDays, setShowDays] = useState(false);

//   const days = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   const handleDropdownChange = () => {};

//   const createDays = () => {
//     return days.map((day) => (
//       <li
//         key={day}
//         style={{ listStyle: "none", display: "flex", alignItems: "center" }}
//       >
//         <input
//           type="checkbox"
//           name="day"
//           id={day}
//           //   style={{ marginRight: "8px" }}
//         />
//         <span>{day}</span>
//       </li>
//     ));
//   };

//   return (
//     <>
//       <button
//         onClick={() => setShowDays(!showDays)}
//         // onBlur={() => setShowDays(!showDays)}
//       >
//         Repeats on
//       </button>
//       {showDays && <ul>{createDays()}</ul>}
//     </>
//   );
// };

// export default MultiSelect;
