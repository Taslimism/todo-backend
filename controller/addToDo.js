const { v4: uuid } = require('uuid');
const TODO_MODEL = require('./../model/notes-model');

const addTodo = async (req, res) => {
    const { userId, todo } = req.body;
    const TODO_ITEM = { id: uuid(), todo };

    try {
        await TODO_MODEL.updateOne({ userId: userId }, { $push: { todo: TODO_ITEM } }, { upsert: true });
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            status: 'fail',
            data: {
                message: 'An unknown error occured'
            }
        })
    }

    return res.status(201).json({
        status: 'success',
        data: {
            message: `Todo Succesfully Added`
        }
    })

}
module.exports = addTodo;