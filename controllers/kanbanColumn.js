import { KanbanColumn as Column, Kanban, Member, KanbanNote } from "../models";
import errorsHandler from "../errors/errorsHandler";
import * as yup from "yup";

export const getColumns = async (req, res) => {
  const { kanbanId } = req.params;
  const creatorId = req.user.id;

  try {
    await yup.number().required().validate(kanbanId);
    const isUserAuthorized = await Member.findOne({
      where: {
        kanbanId,
        userId: creatorId,
      },
    });

    if (!isUserAuthorized) {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }

    const columns = await Column.findAll({
      where: {
        kanbanId,
      },
      include: [
        {
          model: KanbanNote,
          as: "notes",
        },
      ],
    });

    return res.status(200).json({
      message: "Columns retrieved successfully",
      data: columns,
    });
  } catch (error) {
    return errorsHandler(error, req, res);
  }
};

export const createColumn = async (req, res) => {
  const { name, kanbanId } = req.body;
  const creatorId = req.user.id;

  const schema = yup.object().shape({
    name: yup.string().required().min(3).max(32),
    kanbanId: yup.number().required(),
  });
  try {
    await schema.validate(req.body);
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
    return errorsHandler(error, req, res);
  }
};

export const updateColumn = async (req, res) => {
  const { name, kanbanId } = req.body;
  const { id } = req.params;
  const schema = yup.object().shape({
    name: yup.string().required().min(3).max(32),
    kanbanId: yup.number().required(),
  });

  try {
    await schema.validate(req.body);
    await yup.number().required().validate(id);
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
    return errorsHandler(error, req, res);
  }
};

export const deleteColumn = async (req, res) => {
  const { id } = req.params;
  const kanbanId = req.body.kanbanId;
  const creatorId = req.user.id;

  try {
    await yup.number().required().validate(id);
    await yup.number().required().validate(kanbanId);

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
    return errorsHandler(error, req, res);
  }
};
