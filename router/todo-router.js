const express = require('express');

const authorize = require('./../authorize/auth')

const addTodo = require('./../controller/addToDo');
const getTodo = require('./../controller/getToDo');
const deleteTodo = require('./../controller/deleteTodo');

const router = express.Router();

router.post('/', authorize, addTodo)

router.get('/', authorize, getTodo)

router.delete('/', authorize, deleteTodo)

module.exports = router;

