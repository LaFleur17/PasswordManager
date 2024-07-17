import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import Modal from "react-modal";

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
  const [isModalOpen, setIsModalOpen] = useState(false); // Étape 1
  const [rowSelection, setRowSelection] = useState({}); //manage your own row selection state

  const toggleModal = () => setIsModalOpen(!isModalOpen); // Étape 2

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
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.uuid, //use the row's uuid from your database as the row id
    state: {
      rowSelection,
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
  console.log(table.getState().rowSelection); //get the row selection state - { 1: true, 2: false, etc... }
  console.log(table.getSelectedRowModel().rows); //get full client-side selected rows
  console.log(table.getFilteredSelectedRowModel().rows); //get filtered client-side selected rows
  console.log(table.getGroupedSelectedRowModel().rows); //get grouped client-side selected rows
  return (
    <div className="password-manager">
      <div className="search-add-section">
        <Filters
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
        <button className="cta-button" onClick={toggleModal}>
          Add a password
        </button>{" "}
        {/* Étape 3 */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={toggleModal}
          className="modal-content-class"
          overlayClassName="modal-overlay-class"
        >
          {" "}
          {/* Étape 4 */}
          <PasswordsCreator
            authHeader={authHeader}
            data={data}
            setData={setData}
          />
          <button onClick={toggleModal}>Close</button>
        </Modal>
      </div>
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
