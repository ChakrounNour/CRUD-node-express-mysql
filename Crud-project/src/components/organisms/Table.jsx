import React from "react";
import TableRow from "../molecules/TableRow";
import PagingMenu from "../molecules/PagingMenu";
import TableHeader from "../atoms/table/TableHeader";
import TableCell from "../atoms/table/TableCell";

const Table = ({
  headers,
  rows,
  pages,
  currentPage,
  onPageChange,
  className,
  ...props
}) => {
  return (
    <div className={`overflow-x-auto ${className}`} {...props}>
      <table className="w-full bg-white border-collapse border border-gray-300 sm:rounded-md xs:text-xs sm:text-sm md:text-base lg:text-lg">
        <TableHeader headers={headers} />
        <tbody>
          {rows.map((cells, rowIndex) => (
            <TableRow
              key={rowIndex}
              cells={cells}
              className="border border-gray-300 hover:bg-gray-100"
            />
          ))}
        </tbody>
      </table>
      <PagingMenu
        pages={pages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        className="mt-4"
      />
    </div>
  );
};

export default Table;
