import { Router } from "express";
import {
  createColumn,
  updateColumn,
  deleteColumn,
  getColumns,
} from "../controllers/kanbanColumn";

const router = Router();

router.get("/:kanbanId", getColumns);
router.post("/", createColumn);
router.put("/:id", updateColumn);
router.delete("/:id", deleteColumn);

export default router;
