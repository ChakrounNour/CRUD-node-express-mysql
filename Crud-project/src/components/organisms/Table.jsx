import React, { useState } from "react";
import Alerte from "../molecules/Alerte";
import UpdateBook from "./UpdateBook";
import ViewsBook from "./ViewsBook";
import { useDispatch } from "react-redux";
import Pagination from "../molecules/Pagination";
import { deleteBook, getAllBook } from "../../features/books/bookActions";
import { TableHeader } from "../molecules/TableHeader";
import TableRow from "../molecules/TableRow";

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
}) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [isModalOpenView, setIsModalOpenView] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [currentEditBookId, setCurrentEditBookId] = useState(null);
  const [currentViewBookId, setCurrentViewBookId] = useState(null);

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
        closeModal();
        dispatch(getAllBook({ keyword, page, limit }));
      } catch (error) {
        console.log("Error deleting book:", error);
      }
    }
  };

  return (
    <div className={`${className}`}>
      <table className="w-full bg-white border-collapse border border-gray-300 sm:rounded-md xs:text-xs sm:text-sm md:text-base lg:text-lg">
        <TableHeader headers={headers} />
        <tbody>
          {rows.map((cells, rowIndex) => (
            <TableRow
              key={rowIndex}
              cells={cells.slice(1)}
              idBook={cells[0]}
              onView={handleOpenViewModal}
              onEdit={showEditButton ? handleOpenUpdateModal : null}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      <p>
        Total Rows: {totalRow} Page: {totalRow ? page + 1 : 0} of {totalPage}
      </p>
      <Pagination pageCount={totalPage} onPageChange={changePage} />
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
