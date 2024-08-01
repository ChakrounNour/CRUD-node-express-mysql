import React, { useEffect, useState } from "react";
import Modal from "../atoms/modal/Modal";
import { useDispatch } from "react-redux";
import { getByIdBook } from "../../features/books/bookSlice";
import { useNavigate } from "react-router";
import BookService from "../../data/services/bookService";
import CustomButton from "../atoms/button/Button";

function ViewsBook({ open, onClose, idBook }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const book = await BookService.get(idBook);
        setTitle(book.data.title);
        setAuthor(book.data.author);
        console.log(book.data);
      } catch (e) {
        console.log(e);
      }
    };

    if (idBook) {
      fetchBook();
    }
  }, [idBook]);

  const handleAnnulerClick = () => {
    navigate("/");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center w-56">
        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">View Book</h3>
          <div className="my-4">
            <div className="w-full p-2 border border-gray-300 rounded bg-gray-100">
              <strong>Title:</strong> {title}
            </div>
            <div className="w-full p-2 border border-gray-300 rounded mt-2 bg-gray-100">
              <strong>Author:</strong> {author}
            </div>
          </div>
          <div className="flex gap-4">
            <CustomButton variant={"Border"} onClick={handleAnnulerClick}>
              Cancel
            </CustomButton>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ViewsBook;
