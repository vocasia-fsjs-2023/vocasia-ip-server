import sequlizeErrors from "../errors/sequlizeErrors";
import { Kanban, Member } from "../models";

export const createKanban = (req, res) => {
  const { name } = req.body;
  const creatorId = req.user.id;
  try {
    const kanban = Kanban.create({
      name,
      creatorId,
    });

    return res.status(201).json({
      message: "Kanban created successfully",
      data: kanban,
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};

export const updateKanban = (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const creatorId = req.user.id;
  try {
    const kanban = Kanban.update(
      { name },
      {
        where: {
          id,
          creatorId,
        },
      }
    );

    return res.status(200).json({
      message: "Kanban updated successfully",
      data: kanban,
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};

export const deleteKanban = (req, res) => {
  const { id } = req.params;
  const creatorId = req.user.id;

  try {
    const kanban = Kanban.destroy({
      where: {
        id,
        creatorId,
      },
    });

    return res.status(200).json({
      message: "Kanban deleted successfully",
      data: kanban,
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};

export const getKanban = (req, res) => {
  const { id } = req.params;
  const creatorId = req.user.id;

  try {
    const kanban = Kanban.findOne(
      {
        where: {
          id,
          creatorId,
        },
      },
      { include: { all: true } }
    );

    return res.status(200).json({
      message: "Kanban retrieved successfully",
      data: kanban,
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};

export const getKanbans = (req, res) => {
  const creatorId = req.user.id;

  try {
    const kanbans = Kanban.findAll(
      {
        where: {
          creatorId,
        },
      },
      { include: { all: true } }
    );

    return res.status(200).json({
      message: "Kanbans retrieved successfully",
      data: kanbans,
    });
  } catch (error) {
    sequlizeErrors(error, req, res);
  }
};
