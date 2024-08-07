import React from "react";
import TableCell from "../atoms/table/TableCell";
import CustomButtonView from "./CustomButtonView";
import CustomButtonEdit from "./CustomButtonEdit";
import CustomButtonDelete from "./CustomButtonDelete";

const TableRow = ({
  cells,
  onDelete,
  idBook,
  onEdit,
  onView,
  showEditButton = true,
  ...props
}) => {
  return (
    <>
      <tr className={"border border-gray-300 hover:bg-gray-100"} {...props}>
        {cells.map((cell, index) => (
          <TableCell key={index}>{cell}</TableCell>
        ))}
        <TableCell>
          <CustomButtonView
            className="btn-info"
            onClick={() => onView(idBook)}
          />
          <CustomButtonEdit onClick={() => onEdit(idBook)} />
          <CustomButtonDelete
            className="btn btn-danger"
            onClick={() => onDelete(idBook)}
          />
        </TableCell>
      </tr>
    </>
  );
};

export default TableRow;
