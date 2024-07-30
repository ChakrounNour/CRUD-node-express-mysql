import React from "react";

export default function TableHeader({ headers }) {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            style={{ textTransform: "uppercase" }}
            className="text-textDark bg-grisLight text-center xs:text-xs sm:text-sm lg:text-lg"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
}
