import React, { useEffect } from "react";
import Modal from "../atoms/modal/Modal";
import CustomButton from "../atoms/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { getByIdBook } from "../../features/books/bookActions";

function ViewsBook({ open, onClose, idBook }) {
  const dispatch = useDispatch();
  const { book } = useSelector((state) => state.book);

  useEffect(() => {
    if (idBook) {
      dispatch(getByIdBook(idBook));
    }
  }, [idBook, dispatch]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center w-56">
        <div className="mx-auto my-4 w-48">
          <h3 className="text-lg font-black text-gray-800">View Book</h3>
          <div className="my-4">
            <div className="w-full p-2 border border-gray-300 rounded bg-gray-100">
              <strong>Title:</strong> {book?.title}
            </div>
            <div className="w-full p-2 border border-gray-300 rounded mt-2 bg-gray-100">
              <strong>Author:</strong> {book?.author}
            </div>
          </div>
          <div className="flex gap-4">
            <CustomButton variant={"border"} onClick={onClose}>
              Cancel
            </CustomButton>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ViewsBook;
