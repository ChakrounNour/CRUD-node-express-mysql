import React, { useEffect, useState } from "react";
import Modal from "../atoms/modal/Modal";
import { useDispatch } from "react-redux";
import { updateBook } from "../../features/books/bookSlice";
import { useNavigate } from "react-router";
import BookService from "../../data/services/bookService";
import CustomButton from "../atoms/button/Button";

function UpdateBook({ open, onClose, onSave, idBook }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getBook = (idBook) => {
    BookService.get(idBook)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (idBook) {
      getBook(idBook);
    }
  }, [idBook]);

  const handleUpdateClick = async () => {
    await dispatch(updateBook({ id: idBook, title, author }))
      .then(() => {
        onSave();
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAnnulerClick = () => {
    navigate("/");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center w-56">
        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">Update Book</h3>
          <div className="my-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="flex gap-4">
            <CustomButton
              variant={"primary"}
              className={"rounded-md px-3 py-2 "}
              onClick={handleUpdateClick}
            >
              Save
            </CustomButton>
            <CustomButton variant={"Border"} onClick={handleAnnulerClick}>
              Cancel
            </CustomButton>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default UpdateBook;
