import { Router } from "express";

import { addMember, removeMember, updateMember } from "../controllers/member";

const router = Router();

router.post("/", addMember);
router.put("/", updateMember);
router.delete("/", removeMember);

export default router;
