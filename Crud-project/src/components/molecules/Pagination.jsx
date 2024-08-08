import React from "react";
import ReactPaginate from "react-paginate";
export default function Pagination({ pageCount, onPageChange }) {
  return (
    <nav
      className="flex justify-center mt-4"
      role="navigation"
      aria-label="pagination"
    >
      <ReactPaginate
        previousLabel={
          <span className="rounded-md text-gray-700">{"< Prev"}</span>
        }
        nextLabel={
          <span className="rounded-md  text-gray-700">{"Next >"}</span>
        }
        pageCount={pageCount}
        onPageChange={onPageChange}
        containerClassName={"flex space-x-2"}
        pageLinkClassName={
          "px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-500"
        }
        previousLinkClassName={
          "px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
        }
        nextLinkClassName={
          "px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
        }
        activeLinkClassName={"bg-blue-500 text-white border-blue-500"}
        disabledLinkClassName={"bg-gray-200 text-gray-400 cursor-not-allowed"}
      />
    </nav>
  );
}
