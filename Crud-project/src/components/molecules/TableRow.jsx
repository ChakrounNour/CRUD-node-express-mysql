import React from "react";
import TableCell from "../atoms/table/TableCell";
import CustomButtonView from "./CustomButtonView";
import CustomButtonEdit from "./CustomButtonEdit";
import CustomButtonDelete from "./CustomButtonDelete";

const TableRow = ({ cells, onDelete, idBook, onEdit, onView }) => {
  return (
    <>
      <tr className={"border border-gray-300 text-center hover:bg-gray-100"}>
        {cells.map((cell, index) => (
          <TableCell key={index}>{cell}</TableCell>
        ))}
        <TableCell>
          <CustomButtonView onClick={() => onView(idBook)} />
          <CustomButtonEdit onClick={() => onEdit(idBook)} />
          <CustomButtonDelete onClick={() => onDelete(idBook)} />
        </TableCell>
      </tr>
    </>
  );
};

export default TableRow;
