import React, { useState } from "react";
import Table from "../components/organisms/Table";

function ListBook() {
  const tableHeaders = ["Nom", "Email", "Action"];
  const rows = [
    ["John Doe", "john@example.com", "Edit"],
    ["Jane Doe", "jane@example.com", "Edit"],
  ];

  const pages = [1, 2, 3];
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">List Books</h1>
      <Table
        headers={tableHeaders}
        rows={rows}
        pages={pages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default ListBook;
