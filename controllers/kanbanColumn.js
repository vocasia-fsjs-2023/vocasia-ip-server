import {
  KanbanColumn as Column,
  Kanban,
  Member,
  KanbanNote as Note,
} from "../models";
import sequlizeErrors from "../errors/sequlizeErrors";

export const createColumn = async (req, res) => {
  const { name, kanbanId } = req.body;
  const creatorId = req.user.id;

  try {
    const isUserAuthorized = await Member.findOne({
      where: {
        kanbanId,
        userId: creatorId,
        role: "admin",
      },
    });

    if (!isUserAuthorized) {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }

    const column = await Column.create({
      name,
      kanbanId,
    });

    return res.status(201).json({
      message: "Column created successfully",
      data: column,
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};

export const updateColumn = async (req, res) => {
  const { name, kanbanId } = req.body;
  const { id } = req.params;

  try {
    const isUserAuthorized = await Member.findOne({
      where: {
        kanbanId,
        userId: req.user.id,
        role: "admin",
      },
    });

    if (!isUserAuthorized) {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }

    const column = await Column.update(
      { name },
      {
        where: {
          id,
          kanbanId,
        },
      }
    );

    if (column[0] === 0) {
      return res.status(404).json({
        message: "Column not found",
      });
    }

    return res.status(200).json({
      message: "Column updated successfully",
      data: column,
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};

export const deleteColumn = async (req, res) => {
  const { id } = req.params;
  const kanbanId = req.body.kanbanId;
  const creatorId = req.user.id;

  try {
    const isUserAuthorized = await Member.findOne({
      where: {
        kanbanId,
        userId: creatorId,
        role: "admin",
      },
    });

    if (!isUserAuthorized) {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }

    await Note.destroy({
      where: {
        columnId: id,
      },
    });

    const column = await Column.destroy({
      where: {
        id,
        kanbanId,
      },
    });

    if (column === 0) {
      return res.status(404).json({
        message: "Column not found",
      });
    }

    return res.status(200).json({
      message: "Column deleted successfully",
      data: column,
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};
