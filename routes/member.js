import { Router } from "express";

import {
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

export default router;
