
const TODO_MODEL = require('./../model/notes-model');

const getTodo = async (req, res) => {
    const { userId } = req.body;
    let todo;
    try {
        todo = await TODO_MODEL.find({ userId: userId });
    } catch (err) {
        return res.status(500).json({
            status: 'fail',
            data: {
                message: 'An unknown error occured'
            }
        })
    }
    if (todo.length === 0) {
        return res.status(204);
    }
    return res.status(200).json({
        status: 'success',
        data: {
            todo: todo[0].todo
        }
    })
}

module.exports = getTodo;