import express from "express";
import usersRouter from "./routes/user.js";
import { login } from "./controllers/auth.js";
import auth from "./middlewares/auth.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", login);
app.use("/user", auth, usersRouter);

app.listen(port, () => {
  console.log("Server listening on port " + port);
});
