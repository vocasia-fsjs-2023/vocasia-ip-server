import { Router } from "express";

import {
  addByEmail,
  addMember,
  getMembers,
  removeMember,
  updateMember,
} from "../controllers/member";

const router = Router();

router.get("/:kanbanId", getMembers);
router.post("/", addMember);
router.put("/", updateMember);
router.delete("/", removeMember);
router.post("/email", addByEmail);

export default router;
