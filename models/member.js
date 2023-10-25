"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Member.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      kanbanId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Kanbans",
          },
          key: "id",
        },
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        defaultValue: "member",
        values: ["admin", "member"],
      },
    },
    {
      sequelize,
      modelName: "Member",
    }
  );
  return Member;
};
