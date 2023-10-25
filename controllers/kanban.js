import sequlizeErrors from "../errors/sequlizeErrors";
import { Kanban, Member, KanbanColumn, KanbanNote } from "../models";

export const createKanban = async (req, res) => {
  const { name } = req.body;
  const creatorId = req.user.id;
  try {
    const kanban = await Kanban.create({
      name,
      creatorId,
    });

    await Member.create({
      userId: creatorId,
      kanbanId: kanban.id,
      role: "admin",
    });

    return res.status(201).json({
      message: "Kanban created successfully",
      data: kanban,
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};

export const updateKanban = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const creatorId = req.user.id;
  try {
    const kanban = await Kanban.findOne(
      { name },
      {
        where: {
          id,
          creatorId,
        },
      }
    );

    if (!kanban) {
      return res.status(404).json({
        message: "Kanban not found",
      });
    }

    kanban.name = name;
    await kanban.save();

    return res.status(200).json({
      message: "Kanban updated successfully",
      data: kanban,
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};

export const deleteKanban = async (req, res) => {
  const { id } = req.params;
  const creatorId = req.user.id;

  try {
    const kanban = await Kanban.destroy({
      where: {
        id,
        creatorId,
      },
    });

    return res.status(200).json({
      message: "Kanban deleted successfully",
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};

export const getKanban = async (req, res) => {
  const { id } = req.params;
  const creatorId = req.user.id;

  try {
    const kanban = await Kanban.findOne({
      where: {
        id,
        creatorId,
      },
      include: {
        model: KanbanColumn,
        as: "kanbanColumn",
        include: {
          model: KanbanNote,
          as: "kanbanNote",
        },
      },
    });

    return res.status(200).json({
      message: "Kanban retrieved successfully",
      data: kanban,
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};

export const getKanbans = async (req, res) => {
  const creatorId = req.user.id;

  try {
    const kanbans = await Kanban.findAll({
      where: {
        creatorId,
      },
    });

    return res.status(200).json({
      message: "Kanbans retrieved successfully",
      data: kanbans,
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};
