require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Frontend URL
const FRONTEND_URL =
  process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:5173';

const app = express();
app.use(cors());

//controllers
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

// connect to mongoDB
require('./utils/mongodb');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);

// Error handlers
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: err.message, error: err });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})

module.exports = app;