import React, { useState } from "react";
import TableHeader from "../atoms/table/TableHeader";
import PagingMenu from "../molecules/PagingMenu";
import CustomButtonView from "../molecules/CustomButtonView";
import CustomButtonEdit from "../molecules/CustomButtonEdit";
import CustomButtonDelete from "../molecules/CustomButtonDelete";
import Alerte from "../molecules/Alerte";
import UpdateBook from "./UpdateBook";
import ViewsBook from "./ViewsBook";
import { useDispatch } from "react-redux";
import { deleteBook, getAllBook } from "../../features/books/bookSlice";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function Table({
  headers,
  rows,
  page,
  keyword,
  limit,
  totalPage,
  totalRow,
  changePage,
  showEditButton = true,
  className,
  ...props
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [isModalOpenView, setIsModalOpenView] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [currentEditBookId, setCurrentEditBookId] = useState(null);
  const [currentViewBookId, setCurrentViewBookId] = useState(null);
  console.log("Table props:", {
    headers,
    rows,
    page,
    keyword,
    limit,
    totalPage,
    totalRow,
    showEditButton,
    className,
  });
  const openModal = (idBook) => {
    setItemIdToDelete(idBook);
    setIsModalOpen(true);
  };

  const cancelButtonRef = React.useRef(null);

  const handleOpenUpdateModal = (idBook) => {
    setCurrentEditBookId(idBook);
    setIsModalOpenUpdate(true);
  };

  const handleOpenViewModal = (idBook) => {
    setCurrentViewBookId(idBook);
    setIsModalOpenView(true);
  };

  const handleCloseModal = () => {
    setIsModalOpenUpdate(false);
    setIsModalOpenView(false);
  };

  const handleUpdateBook = () => {
    dispatch(getAllBook({ keyword, page, limit }));
    setIsModalOpenUpdate(false);
  };

  const closeModal = () => {
    setItemIdToDelete(null);
    setIsModalOpen(false);
  };

  const handleDelete = (idBook) => {
    openModal(idBook);
  };

  const deleteItem = async () => {
    if (itemIdToDelete) {
      try {
        await dispatch(deleteBook(itemIdToDelete));
        navigate("/");
        closeModal();
        dispatch(getAllBook({ keyword, page, limit }));
      } catch (error) {
        console.log("Error deleting book:", error);
      }
    }
  };

  return (
    <div className={`${className}`} {...props}>
      <table className="w-full bg-white border-collapse border border-gray-300 sm:rounded-md xs:text-xs sm:text-sm md:text-base lg:text-lg">
        <TableHeader headers={headers} />
        <tbody>
          {rows.map((cells, rowIndex) => {
            const id = cells[0];
            const rowCells = cells.slice(1);

            return (
              <tr
                key={rowIndex}
                className="border border-gray-300 hover:bg-gray-100"
                data-id={id}
              >
                {rowCells.map((cell, cellIndex) => (
                  <td key={cellIndex} className="sm:p-4 ms-2 xs:xs-2 sm:ms-4">
                    {cell}
                  </td>
                ))}
                <td className="sm:p-4 ms-2 xs:xs-2 sm:ms-4 inline-flex">
                  <CustomButtonView
                    className="btn btn-info"
                    onClick={() => handleOpenViewModal(id)}
                  />
                  {showEditButton && (
                    <CustomButtonEdit
                      onClick={() => handleOpenUpdateModal(id)}
                    />
                  )}
                  <CustomButtonDelete
                    className="btn btn-danger"
                    onClick={() => handleDelete(id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>
        Total Rows: {totalRow} Page: {totalRow ? page + 1 : 0} of {totalPage}
      </p>
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
          pageCount={totalPage}
          onPageChange={changePage}
          containerClassName={"flex space-x-2"}
          pageLinkClassName={
            "px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
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
      <Alerte
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        deleteItem={deleteItem}
        itemIdToDelete={itemIdToDelete}
        title={"Delete Book"}
        text={
          "Are you sure you want to delete this book? This action cannot be undone."
        }
        cancelButtonRef={cancelButtonRef}
      />
      {currentEditBookId && (
        <UpdateBook
          open={isModalOpenUpdate}
          onClose={handleCloseModal}
          onSave={handleUpdateBook}
          idBook={currentEditBookId}
        />
      )}
      {currentViewBookId && (
        <ViewsBook
          open={isModalOpenView}
          onClose={handleCloseModal}
          idBook={currentViewBookId}
        />
      )}
    </div>
  );
}
