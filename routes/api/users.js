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

//@route     POST api/users
//@desc      Register user
//@access    Public
//"/" gets the route defined in the server.js
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please enter a valid email address').isEmail(),
        check(
            'password',
            'Please enter valid password with 8 or more characters'
        ).isLength({ min: 8 }),
    ],

    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //See if the user exists
        //Get users Gravatar

        res.send('User route');
    }
);
//to export the route we created
module.exports = router;
