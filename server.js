const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const lessonRouter = require('./app/routes/lessons.router');

const PORT = process.env.PORT;
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(lessonRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port:${process.env.PORT}`);
})
