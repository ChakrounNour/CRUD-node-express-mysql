import React from "react";
import TableCell from "../atoms/table/TableCell";
import CustomButtonDelete from "./CustomButtonDelete";
import CustomButtonEdit from "./CustomButtonEdit";

const TableRow = ({ cells, showEditButton = true, className, ...props }) => {
  return (
    <tr className={className} {...props}>
      {cells.slice(0, -1).map((cell, index) => (
        <TableCell key={index}>{cell}</TableCell>
      ))}
      <td className="sm:p-4 ms-2 xs:xs-2 sm:ms-4 inline-flex">
        {showEditButton && <CustomButtonEdit />}
        <CustomButtonDelete />
      </td>
    </tr>
  );
};

export default TableRow;
