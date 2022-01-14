const jwt = require('jsonwebtoken');

const authorize = async (req, res, next) => {
    const auth = req.headers.authorization;

    let token;
    if (auth) {
        token = auth.split(' ')[1];
    } else {
        return res.status(400).json({
            status: 'fail',
            data: {
                message: `Bad Request`
            }
        })

    }

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