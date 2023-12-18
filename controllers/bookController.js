const { Book } = require('../models');

const BookController = {
  getAllBooks: async (req, res, next) => {
    try {
      const books = await Book.findAll();
      res.json(books);
    } catch (error) {
      next(error);
    }
  },

  getBookById: async (req, res, next) => {
    const { id } = req.params;

    try {
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(book);
    } catch (error) {
      next(error);
    }
  },

  createBook: async (req, res, next) => {
    const { title, author } = req.body;

    try {
      const newBook = await Book.create({ title, author });
      res.status(201).json(newBook);
    } catch (error) {
      next(error);
    }
  },

  updateBook: async (req, res, next) => {
    const { id } = req.params;
    const { title, author } = req.body;

    try {
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      await book.update({ title, author });
      res.json(book);
    } catch (error) {
      next(error);
    }
  },

  deleteBook: async (req, res, next) => {
    const { id } = req.params;

    try {
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      await book.destroy();
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = BookController;
