import Books from "../models/BookModel.js";
import { Op, Sequelize } from "sequelize";

export const getBooks = async (req, res) => {
  try {
    const books = await Books.findAll();
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.msg });
  }
};
export const getBooksById = async (req, res) => {
  try {
    const books = await Books.findOne({
      where: { uuid: req.params.id },
      attributes: ["uuid", "title", "author"],
    });
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.msg });
  }
};
export const updateBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author } = req.body;

    const book = await Books.findOne({
      where: {
        uuid: id,
      },
    });

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    await book.update({
      title: title || book.title,
      author: author || book.author,
    });

    res.status(200).json({ msg: "Book updated successfully", book });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createBooks = async (req, res) => {
  const { title, author } = req.body;
  try {
    const newBook = await Books.create({
      title: title,
      author: author,
    });
    res.status(201).json({ msg: "Book created successfully", book: newBook });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};
export const getBooksByTitle = async (req, res) => {
  try {
    const { title } = req.body; // Assuming title is directly in req.body
    if (!title) {
      return res.status(400).json({ msg: "Title query parameter is required" });
    }
    console.log(`Searching for books with title containing: ${title}`); // Debug log

    // Use a raw query
    const books = await sequelize.query(
      "SELECT * FROM Books WHERE title LIKE :title",
      {
        replacements: { title: `%${title}%` },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (books.length === 0) {
      return res
        .status(404)
        .json({ msg: "No books found with the given title" });
    }
    res.status(200).json(books);
  } catch (error) {
    console.error("Error in getBooksByTitle:", error); // Log error
    res.status(500).json({ msg: error.message });
  }
};

export const deleteBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findOne({
      where: {
        uuid: id,
      },
    });
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }
    await Books.destroy({
      where: {
        uuid: id,
      },
    });
    res.status(200).json({ msg: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
