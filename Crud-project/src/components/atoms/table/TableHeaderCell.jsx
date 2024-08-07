import React from "react";

export default function TableHeaderCell({ children }) {
  return (
    <th className="p-2 uppercase text-textDark border-b bg-grisLight text-center xs:text-xs sm:text-sm lg:text-lg">
      {children}
    </th>
  );
}
