import React, { useEffect, useState } from "react";
import Modal from "../atoms/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../atoms/button/Button";
import { getByIdBook, updateBook } from "../../features/books/bookActions";

function UpdateBook({ open, onClose, onSave, idBook }) {
  const dispatch = useDispatch();
  const { book } = useSelector((state) => state.book);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (idBook) {
      dispatch(getByIdBook(idBook));
    }
  }, [idBook, dispatch]);

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
    }
  }, [book]);

  const handleUpdateClick = async () => {
    await dispatch(updateBook({ id: idBook, title, author }))
      .then(() => {
        onSave();
      })
      .catch((e) => {
        console.log(e);
      });
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
            <CustomButton variant={"border"} onClick={onClose}>
              Cancel
            </CustomButton>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default UpdateBook;
