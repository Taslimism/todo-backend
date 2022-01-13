const USER_MODEL = require('./../model/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: 'fail',
            data: {
                message: 'Please fill in all the details'
            }
        })
    }

    let user;
    try {
        user = await USER_MODEL.findOne({ email });
    } catch (err) {
        console.log(err);
    }

    if (!user) {
        return res.status(400).json({
            status: 'fail',
            data: {
                message: 'Please enter valid email'
            }
        })
    }



    let isValidUser = false;
    try {
        isValidUser = await bcrypt.compare(password, user.password);
        console.log(isValidUser)
    } catch (err) {
        console.log(err);
    }

    let token;
    try {
        token = await jwt.sign(user.email, process.env.MY_SUPER_SECRET_KEY);
    } catch (err) {
        console.log(err);
    }


    if (isValidUser) {
        return res.status(200).json({
            status: "success",
            data: {
                user,
                token
            }
        })
    } else {
        return res.status(400).json({
            status: "fail",
            data: {
                message: "Please enter valid password"
            }
        })
    }

}

module.exports = login;