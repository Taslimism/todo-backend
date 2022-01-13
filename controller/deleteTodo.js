const { v4: uuid } = require('uuid');
const TODO_MODEL = require('./../model/notes-model');

const deleteTodo = async (req, res) => {
    const { userId, todoId } = req.body;

    let TODOS;
    try {
        TODOS = await TODO_MODEL.find({ userId: userId });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: 'fail',
            data: {
                message: 'An unknown error occured'
            }
        })
    }

    const newTodo = TODOS[0].todo.filter((item) => {
        return item.id !== todoId
    })
    TODOS[0].todo = newTodo;
    try {
        const TODO = new TODO_MODEL(...TODOS);
        await TODO.save();
    } catch (err) {
        return res.status(500).json({
            status: 'fail',
            data: {
                message: 'An unknown error occured'
            }
        })
    }
    return res.status(204).send("");
}

module.exports = deleteTodo;