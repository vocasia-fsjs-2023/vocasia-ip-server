const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const authMiddleware = require('./middlewares/authMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const bookRouter = require('./routers/bookRouter');
const loanRouter = require('./routers/loanRouter');
const logger = require('./logger'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(authMiddleware);
app.use(helmet());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use('/auth', authRouter);
app.use('/api', libraryRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
