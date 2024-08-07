import React from "react";

export default function TableCell({ children, className, ...props }) {
  return (
    <td
      className={`py-2 px-4 border-b border-gray-300 sm:p-4 ms-2 xs:xs-2 sm:ms-4 ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}
