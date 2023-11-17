const express = require('express');
const router = express.Router(); //router is an instance of teh epress.Router Package

//@route     GET api/posts
//@desc      Test route
//@access    Public
router.get('/', (req, res) => res.send('Posts route'));

//to export the route we created
module.exports = router;
