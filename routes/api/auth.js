const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

//provided address of the package to assign it to variable "auth"
const auth = require('../../middleware/auth');
const User = require('../../models/User');

//It has compare() which we will need
//to compare the plain text password and encrypted password
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const config = require('config');

//==================================================================================

//@route     GET api/auth
//@desc      Test route
//@access    Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//==================================================================================

//@route     POST api/auth
//@desc      Authenticate user and get token
//@access    Public
//"/" gets the route defined in the server.js
router.post(
    '/',
    [
        check('email', 'Please enter a valid email address').isEmail(),
        check('password', 'Password is required').exists(),
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            //Check for the user
            let user = await User.findOne({ email });

            //if not user then send back the error
            if (!user) {
                return res.status(400).json({
                    errors: [{ msg: 'Invalid user credentials' }],
                });
            }

            //Here we are matching the user and password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    errors: [{ msg: 'Invalid password' }],
                });
            }

            //Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id,
                },
            };
            //We assigned the token
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

            // res.send('User registered');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

//to export the route we created
module.exports = router;
