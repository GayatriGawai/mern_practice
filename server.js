const express = require('express'); //for simple express server

//Here we established the connection between two files
const connectDB = require('./config/db');
const app = express();

//connect database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));
/* single end point for check
- the get function has two parameters path(to get the router) and the request and response
- send() is used to pass the message to the browser */

//Defined routes for each js file
/*Use the router exported from ./routes/api/users for any requests 
whose path starts with '/api/users'. */
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
const PORT = process.env.PORT || 5000; //we passed the prot number to a environment varible

app.listen(PORT, () => console.log(`Server started on ${PORT}`)); //we passed the port number here and in the calback function we passsed the message
