const { Loan, User, Book } = require('../models');

const LoanController = {
  getAllLoans: async (req, res, next) => {
    try {
      const loans = await Loan.findAll({
        include: [
          { model: User, attributes: ['id', 'username'] },
          { model: Book, attributes: ['id', 'title'] },
        ],
      });
      res.json(loans);
    } catch (error) {
      next(error);
    }
  },

  getLoanById: async (req, res, next) => {
    const { id } = req.params;

    try {
      const loan = await Loan.findByPk(id, {
        include: [
          { model: User, attributes: ['id', 'username'] },
          { model: Book, attributes: ['id', 'title'] },
        ],
      });

      if (!loan) {
        return res.status(404).json({ message: 'Loan not found' });
      }

      res.json(loan);
    } catch (error) {
      next(error);
    }
  },

  createLoan: async (req, res, next) => {
    const { userId, bookId } = req.body;

    try {
      const user = await User.findByPk(userId);
      const book = await Book.findByPk(bookId);

      if (!user || !book) {
        return res.status(404).json({ message: 'User or book not found' });
      }

      const loan = await Loan.create({ userId, bookId });
      res.status(201).json(loan);
    } catch (error) {
      next(error);
    }
  },

  updateLoan: async (req, res, next) => {
    const { id } = req.params;
    const { userId, bookId } = req.body;

    try {
      const loan = await Loan.findByPk(id);
      const user = await User.findByPk(userId);
      const book = await Book.findByPk(bookId);

      if (!loan || !user || !book) {
        return res.status(404).json({ message: 'Loan, user, or book not found' });
      }

      await loan.update({ userId, bookId });
      res.json(loan);
    } catch (error) {
      next(error);
    }
  },

  deleteLoan: async (req, res, next) => {
    const { id } = req.params;

    try {
      const loan = await Loan.findByPk(id);
      if (!loan) {
        return res.status(404).json({ message: 'Loan not found' });
      }

      await loan.destroy();
      res.json({ message: 'Loan deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = LoanController;
