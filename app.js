import express from "express";
import usersRouter from "./routes/user.js";
import { login } from "./controllers/auth.js";
import auth from "./middlewares/auth.js";
import kanbanRouter from "./routes/kanban.js";
import kanbanColumnRouter from "./routes/kanbanColumn.js";
import kanbanNoteRouter from "./routes/kanbanNote.js";
import memberRouter from "./routes/member.js";
import authRouter from "./routes/auth.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/user", auth, usersRouter);

app.use("/kanban", auth, kanbanRouter);
app.use("/column", auth, kanbanColumnRouter);
app.use("/note", auth, kanbanNoteRouter);
app.use("/kanban/:idKanban/member", auth, memberRouter);

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
