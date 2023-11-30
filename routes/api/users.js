const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

/*In tutorial he used  require('express-validator/check');but we got the error as the module is not found 
because In newer versions of express-validator, the way to import modules
has changed. 
**********IN SHORT*************
In recent versions of express-validator, 
the functionality of express-validator/check 
has been integrated directly into express-validator
*/

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
//@route     POST api/users
//@desc      Register user
//@access    Public
//"/" gets the route defined in the server.js
router.post(
    '/',
    [
        check('name', 'Name is required').notEmpty(),
        check('email', 'Please enter a valid email address').isEmail(),
        check(
            'password',
            'Please enter valid password with 8 or more characters'
        ).isLength({ min: 8 }),
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            //See if the user exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    errors: [{ msg: 'User already exists' }],
                });
            }

            //Get users Gravatar
            const avatar = gravatar.url(email, {
                s: '200', //Default size
                r: 'pg', //Rating
                d: 'mm', //Default(default image)
            });

            //Created the instance of user
            user = new User({
                name,
                email,
                avatar,
                password,
            });

            //Encrypt password
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save(); //Saved the user in database

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
