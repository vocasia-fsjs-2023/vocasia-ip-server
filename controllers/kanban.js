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
    const isUserAuthorized = await Kanban.findOne({
      where: {
        id,
        creatorId,
      },
    });

    if (!isUserAuthorized) {
      return res.status(403).json({
        message: "You are not authorized to delete this kanban",
      });
    }

    await Member.destroy({
      where: {
        kanbanId: id,
      },
    });

    await KanbanNote.destroy({
      where: {
        kanbanId: id,
      },
    });

    await KanbanColumn.destroy({
      where: {
        kanbanId: id,
      },
    });

    isUserAuthorized.destroy();

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
    const isUserAuthorized = await Member.findOne({
      where: {
        kanbanId: id,
        userId: creatorId,
      },
    });

    if (!isUserAuthorized) {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }

    const kanban = await Kanban.findOne({
      where: {
        id,
      },
      include: [
        {
          model: KanbanColumn,
          as: "kanbanColumn",
          include: {
            model: KanbanNote,
            as: "kanbanNote",
          },
        },
        {
          model: Member,
          as: "member",
        },
      ],
    });

    if (!kanban) {
      return res.status(404).json({
        message: "Kanban not found",
      });
    }

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
