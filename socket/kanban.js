import { Kanban } from "../models";
export const updateKanban = async (args) => {
  const { kanbanId, userId, data } = args;
  const { name } = data;
  try {
    await validateUser(userId, kanbanId);
    const kanban = await Kanban.findByPk(kanbanId);
    if (!kanban) {
      throw new Error("Kanban not found");
    }
    await kanban.update({ name });
    return kanban;
  } catch (err) {
    throw new Error(err.message);
  }
};
