import { Router } from "express";
import { getUser, createUser, updateUser } from "../controllers/user.js";

const router = Router();

router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);

export default router;
