require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { errorMiddleware } = require("./middleware/error-middleware");

// const userRoutes = require("./routes/user-route");
// const postRoutes = require("./routes/post-route");
const api = require("./routes/api");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.get("/", (req, res) => {
    res.status(200).send("Blog app api");
});

// app.use(userRoutes);
// app.use(userRoutes);
app.use(api);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server is listened on http://localhost:${port}`);
});
