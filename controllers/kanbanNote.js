import e from "express";
import { KanbanNote as Note, Member } from "../models";
export const createNote = async (req, res) => {
  const { title, description, columnId } = req.body;
  const { kanbanId } = req.query;

  try {
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
    });

    return res.status(201).json({
      message: "Note created successfully",
      data: note,
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};

export const updateNote = async (req, res) => {
  const { title, description, columnId } = req.body;
  const { kanbanId } = req.query;
  const { id } = req.params;

  try {
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

    const note = await Note.update(
      { title, description, columnId },
      {
        where: {
          id,
        },
      }
    );

    if (note[0] === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Note updated successfully",
      data: note,
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};

export const deleteNote = async (req, res) => {
  const { kanbanId } = req.query;
  const { id } = req.params;

  try {
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
    sequlizeErrors(error, req, res);
  }
};
