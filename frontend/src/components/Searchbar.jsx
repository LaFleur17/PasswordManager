import React, { useState } from "react";
import Iconsearch from "../assets/icons/search.svg";
import Icondropdown from "../assets/icons/dropdown.svg";

const Searchbar = ({ columnFilters, setColumnFilters }) => {
  const [searchBy, setSearchBy] = useState("");
  const [inputValue, setInputValue] = useState("");

  const onGlobalSearch = (value) => {
    const searchFields = ["service", "username", "url"];
    const newFilters = searchFields.map((field) => ({ id: field, value }));

    setColumnFilters(newFilters);
  };

  const onFilterChange = (value) => {
    setInputValue(value);
    if (searchBy === "") {
      onGlobalSearch(value);
    } else {
      setColumnFilters((previous) =>
        previous
          .filter((f) => f.id !== searchBy)
          .concat({ id: searchBy, value })
      );
    }
  };

  return (
    <div className="search-bar">
      <div className="search-section">
        <input
          type="text"
          placeholder="All..."
          value={inputValue}
          onChange={(e) => onFilterChange(e.target.value)}
        />
        <img src={Iconsearch} className="search-icon" />
      </div>
      <div className="search-by-dropdown">
        <select
          value={searchBy}
          onChange={(e) => {
            setSearchBy(e.target.value);
            setInputValue("");
          }}
          className="dropdown"
        >
          <option value="">Search by</option>
          <option value="service">Service</option>
          <option value="username">Username</option>
          <option value="url">URL</option>
        </select>
        <img
          src={Icondropdown}
          alt="Show other search options"
          className="dropdown-icon"
        />
      </div>
    </div>
  );
};

export default Searchbar;

// import React from "react";

// const Searchbar = ({ columnFilters, setColumnFilters }) => {
//   const siteName = columnFilters.find((f) => f.id === "service")?.value || "";
//   const onFilterChange = (id, value) =>
//     setColumnFilters((previous) =>
//       previous.filter((f) => f.id !== id).concat({ id, value })
//     );
//   return (
//     <div className="search-bar">
//       <div className="search-section">
//         <input
//           type="text"
//           placeholder="..."
//           value={siteName}
//           onChange={(e) => onFilterChange("service", e.target.value)}
//         />
//         <div className="search-icon"></div>
//       </div>
//     </div>
//   );
// };

// export default Searchbar;
