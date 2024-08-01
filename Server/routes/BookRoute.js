import express from "express";
import {
  createBooks,
  deleteBooks,
  getBooks,
  getBooksById,
  getBooksByTitle,
  updateBooks,
} from "../controllers/Books.js";
const router = express.Router();

router.get("/books", getBooks);
router.get("/books/:id", getBooksById);
router.post("/books", createBooks);
router.delete("/books/:id", deleteBooks);
router.patch("/books/:id", updateBooks);
router.get("/books/search", getBooksByTitle);

export default router;
