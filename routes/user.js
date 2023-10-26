import { Router } from "express";
import { getUser, updateUser, updatePassword } from "../controllers/user.js";

const router = Router();

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.put("/:id/password", updatePassword);

export default router;
