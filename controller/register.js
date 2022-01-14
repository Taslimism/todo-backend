const USER_MODEL = require('./../model/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({
            status: 'fail',
            data: {
                message: 'Please fill in all the fields'
            }
        })
    }

    try {
        const user = USER_MODEL.find({ email: email });
        if (user.length !== 0) {
            return res.status(200).json({
                status: 'success',
                data: {
                    message: 'You already signed up.Please log in'
                }
            })
        }

    } catch (err) {
        console.log("message");
        return res.status(500).json({
            status: 'failure',
            data: {
                message: `An unknown error occured in DB`
            }
        })

    }

    let pswd;
    try {
        pswd = await bcrypt.hash(password, 12);
    } catch (err) {
        return res.status(500).json({
            status: 'fail',
            data: {
                message: 'An unknown error occured while hashing'
            }
        })
    }

    let token;
    try {
        token = await jwt.sign({ email: email, password: password }, process.env.MY_SUPER_SECRET_KEY, { expiresIn: '1h' })

    } catch (err) {
        return res.status(500).json({
            status: 'fail',
            data: {
                message: 'An unknown error occured while tokenising'
            }
        })
    }

    let user;
    try {
        user = new USER_MODEL({
            name,
            email,
            password: pswd
        });
        await user.save();
    } catch (err) {

        return res.status(500).json({
            status: 'fail',
            data: {
                message: 'An unknown error occured while saving to DB'
            }
        })
    }


    res.status(201).json({
        message: 'success',
        data: {
            user,
            token
        }
    })

}

module.exports = register;