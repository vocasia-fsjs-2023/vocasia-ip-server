'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recipe.belongsTo(models.User, {foreignKey: 'userId'});
    }
  }
  Recipe.init({
    title: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    ingredients: {
      type:DataTypes.TEXT,
      allowNull:false,
    },
    rating: {
      type:DataTypes.INTEGER,
      allowNull:true,//null blm ada rating
      validate:{
        min:1,
        max:10
      }
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};