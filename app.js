import express from "express";
import usersRouter from "./routes/user.js";
import { login } from "./controllers/auth.js";
import auth from "./middlewares/auth.js";
import kanbanRouter from "./routes/kanban.js";
import kanbanColumnRouter from "./routes/kanbanColumn.js";
import kanbanNoteRouter from "./routes/kanbanNote.js";
import memberRouter from "./routes/member.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", login);
app.use("/user", auth, usersRouter);

app.use("/kanban", auth, kanbanRouter);
app.use("/column", auth, kanbanColumnRouter);
app.use("/note", auth, kanbanNoteRouter);
app.use("/member", auth, memberRouter);

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
