import React from "react";

const Searchbar = ({ columnFilters, setColumnFilters }) => {
  const siteName = columnFilters.find((f) => f.id === "siteName")?.value || "";
  const onFilterChange = (id, value) =>
    setColumnFilters((previous) =>
      previous.filter((f) => f.id !== id).concat({ id, value })
    );
  return (
    <div className="passwords-filters">
      <label htmlFor="search">Search</label>
      <div className="search-section">
        <input
          type="text"
          placeholder="Site Name"
          value={siteName}
          onChange={(e) => onFilterChange("siteName", e.target.value)}
        />
        <div className="search-icon"></div>
      </div>
    </div>
  );
};

export default Searchbar;
