'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    static associate(models) {
      // Define associations here
      Loan.belongsTo(models.User, { foreignKey: 'userId' });
      Loan.belongsTo(models.Book, { foreignKey: 'bookId' });
    }
  }
  Loan.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Book',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Loan',
    }
  );
  return Loan;
};
