import color from "./color";
import kanbancolumn from "./kanbancolumn";
import kanbannote from "./kanbannote";
import user from "./user";
import member from "./member";
import kanban from "./kanban";

import { Sequelize } from "sequelize";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const sequelize = new Sequelize(config);

/* These lines of code are creating instances of Sequelize models for the Color, KanbanColumn,
KanbanNote, User, Member, and Kanban tables in the database. Each model is created by calling a
function (e.g., `color(sequelize, Sequelize.DataTypes)`) and passing in the Sequelize instance and
the Sequelize DataTypes object. The returned value is then assigned to a constant variable (e.g.,
`const Color = ...`) for later use in defining associations and performing database operations. */
const Color = color(sequelize, Sequelize.DataTypes);
const KanbanColumn = kanbancolumn(sequelize, Sequelize.DataTypes);
const KanbanNote = kanbannote(sequelize, Sequelize.DataTypes);
const User = user(sequelize, Sequelize.DataTypes);
const Member = member(sequelize, Sequelize.DataTypes);
const Kanban = kanban(sequelize, Sequelize.DataTypes);

//setting up associations
User.hasMany(Kanban, {
  foreignKey: "creatorId",
  as: "kanban",
});

Kanban.belongsTo(User, {
  foreignKey: "creatorId",
  as: "creator",
});

Kanban.hasMany(KanbanColumn, {
  foreignKey: "kanbanId",
  as: "kanbanColumn",
});

KanbanColumn.belongsTo(Kanban, {
  foreignKey: "kanbanId",
  as: "kanban",
});

Kanban.hasMany(KanbanNote, {
  foreignKey: "kanbanId",
  as: "kanbanNote",
});

KanbanNote.belongsTo(Kanban, {
  foreignKey: "kanbanId",
  as: "kanban",
});

KanbanColumn.hasMany(KanbanNote, {
  foreignKey: "columnId",
  as: "notes",
});

KanbanNote.belongsTo(KanbanColumn, {
  foreignKey: "columnId",
  as: "column",
});

User.hasMany(Member, {
  foreignKey: "userId",
  as: "member",
});

Member.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

Kanban.hasMany(Member, {
  foreignKey: "kanbanId",
  as: "member",
});

Member.belongsTo(Kanban, {
  foreignKey: "kanbanId",
  as: "kanban",
});

Color.hasMany(KanbanNote, {
  foreignKey: "colorId",
  as: "kanbanNote",
});

KanbanNote.belongsTo(Color, {
  foreignKey: "colorId",
  as: "color",
});

export { Color, KanbanColumn, KanbanNote, User, Member, Kanban };
