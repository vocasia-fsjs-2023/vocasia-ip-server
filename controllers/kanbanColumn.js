import {
  KanbanColumn as Column,
  Kanban,
  Member,
  KanbanNote as Note,
} from "../models";

export const createColumn = async (req, res) => {
  const { title, kanbanId } = req.body;
  const creatorId = req.user.id;

  try {
    /* The code `const kanban = await Member.findOne({ where: { kanbanId, userId: creatorId } })` is
  querying the `Member` model to find a specific member who is associated with a particular
  `kanbanId` and `userId`. It is used to check if the member exists in the database before creating
  a new column. */
    const kanban = await Member.findOne({
      where: {
        kanbanId,
        userId: creatorId,
      },
    });

    if (!kanban) {
      return res.status(404).json({
        message: "Kanban not found",
      });
    }

    const column = await Column.create({
      title,
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
  const { title, kanbanId } = req.body;
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
      { title },
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

    await Note.destroy({
      where: {
        columnId: id,
      },
    });

    return res.status(200).json({
      message: "Column deleted successfully",
      data: column,
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};
