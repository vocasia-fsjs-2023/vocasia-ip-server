import { Router } from "express";

import {
  createNote,
  updateNote,
  deleteNote,
  moveKanbanNoteColumn,
} from "../controllers/kanbanNote";

const router = Router();

router.post("/", createNote);
router.put("/:id", updateNote);
router.patch("/", moveKanbanNoteColumn);
router.delete("/:id", deleteNote);

export default router;
