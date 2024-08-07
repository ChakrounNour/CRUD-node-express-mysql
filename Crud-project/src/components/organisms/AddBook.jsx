import React, { useEffect, useState } from "react";
import Modal from "../atoms/modal/Modal";
import { useDispatch } from "react-redux";
import CustomButton from "../atoms/button/Button";
import { createBook, getAllBook } from "../../features/books/bookActions";

function AddBook({ open, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const dispatch = useDispatch();
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(
      createBook({
        title: title,
        author: author,
      })
    );
    setTitle("");
    setAuthor("");
    onSave();
    onClose();
    dispatch(getAllBook());
  };
  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center w-56">
        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">Add New Book</h3>
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
              onClick={handleSave}
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

export default AddBook;
