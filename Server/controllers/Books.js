import Books from "../models/BookModel.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Books.findAll({
      attributes: ["uuid", "title", "author"],
    });
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

    res.status(200).json({ msg: "Book updated successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createBooks = async (req, res) => {
  const { id } = req.params;

  const { title, author } = req.body;
  try {
    await Books.create({
      title: title,
      author: author,
    });
    res.status(201).json({ msg: "Book created successfully" });
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
