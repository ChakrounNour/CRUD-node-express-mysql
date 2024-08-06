import Books from "../models/BookModel.js";
import { Op } from "sequelize";

export const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 4;
    const search = req.query.search_query || "";
    const offset = page * limit;
    const totalRows = await Books.count({
      where: { title: { [Op.like]: `%${search}%` } },
    });
    const totalPage = Math.ceil(totalRows / limit);
    const result = await Books.findAll({
      where: { title: { [Op.like]: `%${search}%` } },
      limit: limit,
      offset: offset,
      order: [["id", "DESC"]],
    });
    res.json({
      result: result,
      page: page,
      limit: limit,
      totalRows: totalRows,
      totalPage: totalPage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: error.message || "An error occurred while retrieving books.",
    });
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
