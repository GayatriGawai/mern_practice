const express = require('express'); //for simple express server

const app = express();

app.get('/', (req, res) => res.send('API Running')); //single end point for check
// the get function has two parameters path and the request and response

const PORT = process.env.PORT || 5000; //we passed the prot number to a environment varible

app.listen(PORT, () => console.log(`Server started on ${PORT}`)); //we passed the port number here and in the calback function we passsed the message
