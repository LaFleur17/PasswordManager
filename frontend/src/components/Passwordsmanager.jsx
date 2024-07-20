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
import Copypassword from "./Copypassword";

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

  const columns = [
    {
      accessorKey: "service",
      header: "Service",
      cell: ({ row }) => <p className="service-cell">{row.original.service}</p>,
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: (props) => <p className="username-cell">{props.getValue()}</p>,
    },
    {
      accessorKey: "url",
      header: "URL",
      cell: (props) => (
        <p className="url-cell">
          {props.getValue()?.replace(/https?:\/\//, "")}
        </p>
      ),
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
        return <p className="updatedat-cell">{formattedDate}</p>;
      },
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => (
        <ul className="tags-cell">
          {row.original.tags.map((tag, index) => (
            <li key={index} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      ),
    },
    {
      accessorKey: "_id",
      header: "Tools",
      cell: ({ row }) => (
        <Copypassword passwordId={row.original._id} authHeader={authHeader} />
      ),
    },
  ];

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
              <div className="table-header" key={header.id}>
                {header.column.columnDef.header}
              </div>
            ))}
          </div>
        ))}
        {table.getRowModel().rows.map((row) => (
          <div className="table-row" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <div className="table-cell" key={cell.id}>
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
