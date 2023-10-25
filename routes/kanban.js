import { Router } from "express";
import {
  getKanbans,
  getKanban,
  createKanban,
  deleteKanban,
  updateKanban,
} from "../controllers/kanban";

const router = Router();

router.get("/", getKanbans);
router.get("/:id", getKanban);
router.post("/", createKanban);
router.put("/:id", updateKanban);
router.delete("/:id", deleteKanban);

export default router;
