"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class KanbanNote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KanbanNote.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
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
      columnId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "KanbanColumns",
          },
          key: "id",
        },
        allowNull: false,
      },
      creatorId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        allowNull: false,
      },
      colorId: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Colors",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,

      modelName: "KanbanNote",
    }
  );
  return KanbanNote;
};
