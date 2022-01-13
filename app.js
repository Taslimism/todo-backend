const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 9000;
const users = require('./router/user-router');
const todos = require('./router/todo-router');

const app = express();
app.use(express.json());
dotenv.config();

const URL = process.env.DB_URL.replace('<DB_USER>', process.env.DB_USER)
    .replace(`<DB_PASSWORD>`, process.env.DB_PASSWORD)
    .replace('<DB_NAME>', process.env.DB_NAME);


mongoose.connect(URL).then(() => console.log("Connected to DB")).catch(err => console.log(err));


app.use('/api/v1/user', users);
app.use('/api/v1/todo', todos);


app.listen(PORT, () => {
    console.log(`SERVER is running on port ${PORT}`);
})