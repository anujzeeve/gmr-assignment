const express = require('express')
// require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config();
const databaseUrl = process.env.DATABASE_URL;
const secretKey = process.env.SECRET_KEY;
const port = process.env.PORT;
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
module.exports = app