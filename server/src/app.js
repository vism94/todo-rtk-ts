const express = require('express');
const morgan = require('morgan');
const tasksRouter = require('./routes/cardsRouter');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/tasks', tasksRouter);

module.exports = app;
