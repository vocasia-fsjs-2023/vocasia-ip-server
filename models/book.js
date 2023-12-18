'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Title cannot be empty',
          },
        },
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Author cannot be empty',
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
      },
      genre: {
        type: DataTypes.STRING,
      },
      publicationYear: {
        type: DataTypes.INTEGER,
      },
      availableCopies: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: {
            args: 0,
            msg: 'Available copies cannot be negative',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Book',
    }
  );
  return Book;
};
