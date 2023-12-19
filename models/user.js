'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Recipe);
    }
  }
  User.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate:{
        isEmail: true
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    role: {type:DataTypes.BOOLEAN, defaultValue: false},
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      }
    }
  });
  return User;
};