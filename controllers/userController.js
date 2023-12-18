const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserController = {
  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    const { id } = req.params;
    const { username, email, password, role } = req.body;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await user.update({
        username,
        email,
        password: hashedPassword,
        role,
      });

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = UserController;
