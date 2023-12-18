const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.get('/books', BookController.getAllBooks);
router.get('/books/:id', BookController.getBookById);
router.post('/books', BookController.createBook);
router.put('/books/:id', BookController.updateBook);
router.delete('/books/:id', BookController.deleteBook);

module.exports = router;
