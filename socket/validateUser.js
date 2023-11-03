import { Member } from "../models";

export default async function validateUser(userId, kanbanId) {
  const isUserCanJoin = await Member.findOne({
    where: { userId, kanbanId },
  });
  if (!isUserCanJoin) {
    throw new Error("You're not allowed to join this room");
  }
  return true;
}
