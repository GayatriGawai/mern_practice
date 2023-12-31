// We created this file to established the connection between the Mongoose and MongoDB

const mongoose = require('mongoose'); //We are actually using this to connect
const config = require('config'); //to grab the string that we put in the default JSON file(the username)
const db = config.get('mongoURI'); //To get the actual value of that string we stored in the JSON file

//To connect to mongoDB
/*We used teh arrow function so,
 we can call within the server.js*/
const connectDB = async () => {
    /*We used try-catch, to display the error if 
    there is any while establishing the connection.
    */
    try {
        await mongoose.connect(db);
        /* you can use the following if you are getting error as 
        " current URL string is deprecated, and will be removed in a future version."
        
        await mongoose.connect(db, { userNewUrlParser: true });

        And if you are getting the error as 'DeprecationWarning : collection.ensureIndex is deprecated. 
        Use createIndexes instead'

        then : try foillowing
             await mongoose.connect(db, { userNewUrlParser: true,
                                          userCreateIndex: true 
                                        });


        if you recieve the error as DeprecationWarning: collection.findAndModify 
        is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete
        instead.
        the : try following :
             await mongoose.connect(db, { userNewUrlParser: true,
                                          userCreateIndex: true,
                                          userFindAndModify: false
                                        });

*/
        console.log('+++++ MongoDB Connected +++++');
    } catch (err) {
        //It prints the error message
        console.error(err.message); //err.message is property
        //Exit process with failure
        process.exit(1); //Here want the application to fail
    }
};

//to export the connection we created
module.exports = connectDB;
