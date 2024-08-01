import React, { useEffect, useState } from "react";
import Table from "../components/organisms/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllBook } from "../features/books/bookSlice";
import InputwithButton from "../components/molecules/InputwithButton";
import CustomButton from "../components/atoms/button/Button";
import AddBook from "../components/organisms/AddBook";

function ListBook() {
  const dispatch = useDispatch();
  const { bookList, response, isError, isSuccess, isLoading, message } =
    useSelector((state) => state.book);
  const tableHeaders = ["Title", "Author", "Action"];
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllBook());
  }, [dispatch]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveBook = () => {
    dispatch(getAllBook());
    setIsModalOpen(false); 
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-between items-center">
        <CustomButton
          variant={"blue"}
          className={"rounded-sm p-2"}
          onClick={handleOpenModal}
        >
          Add Book
        </CustomButton>
        <AddBook
          open={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveBook}
        />

        <InputwithButton
          type={"text"}
          placeholder={"Search"}
          variant={"blue"}
          text={"Ok"}
        />
      </div>

      <Table
        headers={tableHeaders}
        rows={bookList.map((book) => [book.uuid, book.title, book.author])} // Include UUID but not in headers
        pages={[1, 2, 3]}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default ListBook;
