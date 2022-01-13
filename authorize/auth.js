const jwt = require('jsonwebtoken');

const authorize = async (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    try {
        const isVerified = await jwt.verify(token, process.env.MY_SUPER_SECRET_KEY);
    } catch (err) {
        return res.status(403).json({
            status: 'fail',
            data: {
                message: `user not authorized`
            }
        })
    }
    next();
}

module.exports = authorize;