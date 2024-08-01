import React, { useState } from "react";
import TableCell from "../atoms/table/TableCell";
import CustomButtonDelete from "./CustomButtonDelete";
import CustomButtonEdit from "./CustomButtonEdit";
import Modal from "../atoms/modal/Modal";
import { BsTrash } from "react-icons/bs";

const TableRow = ({
  cells,
  onDelete,
  showEditButton = true,
  className,
  ...props
}) => {
  return (
    <tr className={className} {...props}>
      {cells.map((cell, index) => (
        <>
          <TableCell key={index}>{cell}</TableCell>
        </>
      ))}
    </tr>
  );
};

export default TableRow;
