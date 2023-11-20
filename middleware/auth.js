const jwt = require('jsonwebtoken');
const config = require('config');

//middleware function
module.exports = function (req, res, next) {
    //Get token from the header
    const token = req.header('x-auth-token'); //We need to send token to the header

    //Check if no token
    if (!token) {
        return res
            .status(401)
            .json({ msg: 'No token found: Authorization denied' });
    }

    //Verify the token
    try {
        //This will decode the token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};
