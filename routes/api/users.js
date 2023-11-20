const express = require('express');
const router = express.Router();

//@route     POST api/users
//@desc      Register user
//@access    Public
//"/" gets the route defined in the server.js
router.post('/', (req, res) => {
    console.log(req.body);
    res.send('User route');
});
//to export the route we created
module.exports = router;
