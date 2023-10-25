import { Router } from "express";
import {
  createColumn,
  updateColumn,
  deleteColumn,
} from "../controllers/kanbanColumn";

const router = Router();

router.post("/", createColumn);
router.put("/:id", updateColumn);
router.delete("/:id", deleteColumn);

export default router;
