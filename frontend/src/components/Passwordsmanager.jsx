import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

import { getPasswords } from "../services/api";
import Filters from "./Passwordsfilters";
import PasswordsCreator from "./Passwordscreator";

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

const Passwordmanager = ({ authHeader }) => {
  //note: data needs a "stable" reference in order to prevent infinite re-renders
  // toutes les fonctions qui viennent de la librairie
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPasswords(authHeader);
        setData(response.data); // Assurez-vous que cela correspond au format attendu par votre tableau
      } catch (error) {
        console.error("GetPasswords failed:", error);
      }
    };

    fetchData();
  }, [authHeader.authToken]);
  const table = useReactTable({
    columns,
    data,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
      <Filters
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
      <PasswordsCreator authHeader={authHeader} data={data} setData={setData} />
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
        <button
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          onClick={() => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Passwordmanager;
