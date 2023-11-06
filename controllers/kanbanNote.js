import { KanbanNote as Note, Member } from "../models";
import errorsHandler from "../errors/errorsHandler";
import * as yup from "yup";
export const createNote = async (req, res) => {
  const { title, description, columnId, colorId, kanbanId } = req.body;
  const creatorId = req.user.id;
  const schema = yup.object().shape({
    title: yup.string().required().min(3).max(32),
    columnId: yup.number().required(),
    colorId: yup.number().required(),
    kanbanId: yup.number().required(),
  });

  try {
    await schema.validate(req.body);
    const isUserAuthorized = await Member.findOne({
      where: {
        kanbanId: kanbanId,
        userId: req.user.id,
      },
    });

    if (!isUserAuthorized) {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }

    const note = await Note.create({
      title,
      description,
      columnId,
      colorId,
      creatorId,
      kanbanId,
    });

    return res.status(201).json({
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    return errorsHandler(error, req, res);
  }
};

export const updateNote = async (req, res) => {
  const { title, description, columnId, kanbanId } = req.body;
  const { id } = req.params;

  const schema = yup.object().shape({
    title: yup.string().required().min(3).max(32),
    description: yup.string(),
    columnId: yup.number().required(),
    kanbanId: yup.number().required(),
  });

  try {
    await schema.validate(req.body);
    await yup.number().required().validate(id);
    const isUserAuthorized = await Member.findOne({
      where: {
        kanbanId: kanbanId,
        userId: req.user.id,
      },
    });

    if (!isUserAuthorized) {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }

    const note = await Note.findOne({
      where: {
        id,
        columnId,
      },
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    note.title = title;
    note.description = description;
    note.columnId = columnId;
    await note.save();

    return res.status(200).json({
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    return errorsHandler(error, req, res);
  }
};

export const deleteNote = async (req, res) => {
  const { kanbanId } = req.body;
  const { id } = req.params;

  try {
    await yup.number().required().validate(id);
    await yup.number().required().validate(kanbanId);
    const isUserAuthorized = await Member.findOne({
      where: {
        kanbanId: kanbanId,
        userId: req.user.id,
      },
    });

    if (!isUserAuthorized) {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }

    const note = await Note.destroy({
      where: {
        id,
      },
    });

    if (note[0] === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Note deleted successfully",
      data: note,
    });
  } catch (error) {
    return errorsHandler(error, req, res);
  }
};
