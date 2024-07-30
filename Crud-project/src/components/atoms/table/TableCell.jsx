import React from "react";

export default function TableCell({ children, className, ...props }) {
  return (
    <td
      className={`py-2 px-4 border-b border-gray-300 ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}
