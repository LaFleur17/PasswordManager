import React, { useState, useEffect } from "react";

import { flexRender } from "@tanstack/react-table";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Searchbar from "./Searchbar";
import Addform from "./Addform";

const columns = [
  {
    accessorKey: "siteName",
    header: "Site Name",
    cell: ({ row }) => (
      <div className="sitename-cell">
        <h4>{row.original.siteName.toUpperCase()}</h4>
        <p>{row.original.customName}</p>
      </div>
    ),
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: (props) => <p>{props.getValue()?.replace(/https?:\/\//, "")}</p>,
  },
  {
    accessorKey: "updatedAt",
    header: "Latest update",
    cell: (props) => {
      const date = new Date(props.getValue());
      const formattedDate = date
        .toLocaleString("eng-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .replace(/\//g, "-")
        .replace(",", " -");
      return <p>{formattedDate}</p>;
    },
  },
];

const Passwordmanager = ({ data, setData, authHeader, showPasswords }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);

  const toggleAddForm = () => setShowAddForm(!showAddForm);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    showPasswords();
  }, [authHeader.authToken]);

  const table = useReactTable({
    columns,
    data,
    getRowId: (row) => row.uuid,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((previous) =>
          previous.map((row, index) =>
            index === rowIndex
              ? { ...previous[rowIndex], [columnId]: value }
              : row
          )
        ),
    },
  });

  return (
    <div className="password-manager">
      <div className="search-add-section">
        <Searchbar
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
        <button className="cta-button" onClick={toggleAddForm}>
          {showAddForm ? "Hide Add Form" : "Add a password"}
        </button>
      </div>
      {showAddForm && (
        <Addform authHeader={authHeader} data={data} setData={setData} />
      )}
      <div className="table">
        {table.getHeaderGroups().map((headerGroup) => (
          <div className="table-row" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <div
                className="table-header"
                w={header.getSize()}
                key={header.id}
              >
                {header.column.columnDef.header}
              </div>
            ))}
          </div>
        ))}
        {table.getRowModel().rows.map((row) => (
          <div className="table-row" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <div
                className="table-cell"
                w={cell.column.getSize()}
                key={cell.id}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>
      <p>
        Page {table.getState().pagination.pageIndex + 1} of {""}
        {table.getPageCount()}
      </p>
      <div>
        <button onClick={() => table.previousPage()}>{"<"}</button>
        <button onClick={() => table.nextPage()}>{">"}</button>
      </div>
    </div>
  );
};

export default Passwordmanager;
