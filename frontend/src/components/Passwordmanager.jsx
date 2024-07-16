import React, { useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import passwordData from "./data";

const columns = [
  {
    accessorKey: "siteName",
    header: "Site Name",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "customName",
    header: "Custom Name",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "updatedAt",
    header: "Latest update",
    cell: (props) => <p>{props.getValue()?.toLocaleString()}</p>,
  },
  {
    accessorKey: "lastCopy",
    header: "Latest copy",
    cell: (props) => <p>{props.getValue()?.toLocaleString()}</p>,
  },
];

const Passwordmanager = () => {
  //note: data needs a "stable" reference in order to prevent infinite re-renders
  // toutes les fonctions qui viennent de la librairie
  const [data, setData] = useState(() => passwordData);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="password-manager">
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
    </div>
  );
};

export default Passwordmanager;
