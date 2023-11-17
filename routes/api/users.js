const express = require('express');
const router = express.Router();

//@route     GET api/users
//@desc      Test route
//@access    Public
//"/" gets the route defined in the server.js
router.get('/', (req, res) => res.send('User route'));
//to export the route we created
module.exports = router;
