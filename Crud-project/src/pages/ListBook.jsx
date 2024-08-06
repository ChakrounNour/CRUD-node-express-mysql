import React, { useEffect, useState } from "react";
import Table from "../components/organisms/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  findBooksByTitle,
  getAllBook,
  setKeyword,
  setPage,
  setQuery,
} from "../features/books/bookSlice";
import InputwithButton from "../components/molecules/InputwithButton";
import CustomButton from "../components/atoms/button/Button";
import AddBook from "../components/organisms/AddBook";

function ListBook() {
  const dispatch = useDispatch();
  const {
    bookList,
    isLoading,
    isError,
    message,
    totalPage,
    limit,
    totalRow,
    page,
    keyword,
    query,
  } = useSelector((state) => state.book);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllBook({ keyword: keyword, page: page, limit: limit }));
  }, [dispatch, keyword, page, limit]);
  const [currentPage, setCurrentPage] = useState(0);

  const changePage = ({ selected }) => {
    dispatch(setPage(selected));
    setCurrentPage(selected);
  };

  const searchData = (e) => {
    e.preventDefault();
    dispatch(setPage(0));
    dispatch(setKeyword(query));
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveBook = () => {
    dispatch(getAllBook({ keyword, page, limit }));
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
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          onClick={searchData}
        />
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">{message}</p>}
      {bookList && bookList.length > 0 ? (
        <Table
          headers={["Title", "Author", "Action"]}
          rows={bookList.map((book) => [book.uuid, book.title, book.author])}
          totalPage={totalPage}
          totalRow={totalRow}
          keyword={keyword}
          limit={limit}
          currentPage={currentPage}
          page={page}
          changePage={changePage}
        />
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
}

export default ListBook;
