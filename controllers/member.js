import { Member } from "../models";
export const addMember = async (req, res) => {
  const { kanbanId, userId, role } = req.body;
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
    sequlizeErrors(error, req, res);
  }
};

export const updateMember = async (req, res) => {
  const { kanbanId, userId, role } = req.body;
  const { memberId } = req.query;

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

    const member = await Member.update(
      { role },
      {
        where: {
          id: memberId,
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
    sequlizeErrors(error, req, res);
  }
};

export const removeMember = async (req, res) => {
  const { memberId, kanbanId } = req.query;
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

    const member = await Member.destroy({
      where: {
        id: memberId,
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
    sequlizeErrors(error, req, res);
  }
};
