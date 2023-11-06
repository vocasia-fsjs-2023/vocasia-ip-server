import { Kanban, Member, User } from "../models";
import errorsHandler from "../errors/errorsHandler";
import * as yup from "yup";

export const getMembers = async (req, res) => {
  const { kanbanId } = req.params;
  const schema = yup.object().shape({
    kanbanId: yup.number().required(),
  });
  try {
    await schema.validate(req.params);
    const isUserAuthorized = await Member.findOne({
      where: {
        kanbanId,
        userId: req.user.id,
      },
    });

    if (!isUserAuthorized) {
      return res.status(401).json({
        message: "You are not authorized to perform this action",
      });
    }

    const members = await Member.findAll({
      where: {
        kanbanId,
      },
      include: {
        model: User,
        as: "user",
        attributes: ["id", "username", "email"],
      },
    });

    return res.status(200).json({
      message: "Members retrieved successfully",
      data: members,
    });
  } catch (error) {
    return errorsHandler(error, req, res);
  }
};

export const addByEmail = async (req, res) => {
  const { kanbanId, email, role } = req.body;
  const creatorId = req.user.id;
  const schema = yup.object().shape({
    kanbanId: yup.number().required(),
    email: yup.string().email().required(),
    role: yup.mixed().oneOf(["admin", "member"]).required(),
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

    const isUserExist = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!isUserExist) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isExistingMember = await Member.findOne({
      where: {
        kanbanId,
        userId: isUserExist.id,
      },
    });

    if (isExistingMember) {
      return res.status(409).json({
        message: "Member already exists",
      });
    }

    const member = await Member.create({
      kanbanId,
      userId: isUserExist.id,
      role,
    });

    return res.status(201).json({
      message: "Member added successfully",
      data: member,
    });
  } catch (error) {
    return errorsHandler(error, req, res);
  }
};

export const addMember = async (req, res) => {
  const { kanbanId, userId, role } = req.body;
  const creatorId = req.user.id;
  const schema = yup.object().shape({
    kanbanId: yup.number().required(),
    userId: yup.number().required(),
    role: yup.mixed().oneOf(["admin", "member"]).required(),
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

    const isUserExist = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!isUserExist) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isExistingMember = await Member.findOne({
      where: {
        kanbanId,
        userId,
      },
    });

    if (isExistingMember) {
      return res.status(409).json({
        message: "Member already exists",
      });
    }

    const member = await Member.create({
      kanbanId,
      userId,
      role,
    });

    return res.status(201).json({
      message: "Member added successfully",
      data: member,
    });
  } catch (error) {
    return errorsHandler(error, req, res);
  }
};

export const updateMember = async (req, res) => {
  const { kanbanId, userId, role } = req.body;
  const schema = yup.object().shape({
    kanbanId: yup.number().required(),
    userId: yup.number().required(),
    role: yup.mixed().oneOf(["admin", "member"]).required(),
  });
  try {
    await schema.validate(req.body);
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

    const member = await Member.update(
      { role },
      {
        where: {
          userId,
          kanbanId,
        },
      }
    );

    if (member[0] === 0) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    return res.status(200).json({
      message: "Member updated successfully",
    });
  } catch (error) {
    return errorsHandler(error, req, res);
  }
};

export const removeMember = async (req, res) => {
  const { userId, kanbanId } = req.body;
  const schema = yup.object().shape({
    userId: yup.number().required(),
    kanbanId: yup.number().required(),
  });
  try {
    await schema.validate(req.body);
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

    const kanbanCreator = await Kanban.findOne({
      where: {
        id: kanbanId,
        creatorId: userId,
      },
    });

    if (kanbanCreator) {
      return res.status(401).json({
        message: "You cannot remove the creator of the kanban",
      });
    }

    const member = await Member.destroy({
      where: {
        userId,
        kanbanId,
      },
    });

    if (member[0] === 0) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    return res.status(200).json({
      message: "Member deleted successfully",
    });
  } catch (error) {
    return errorsHandler(error, req, res);
  }
};
