const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const users = require('./routes/useRoutes')
const cookieParser = require('cookie-parser');


const Port = process.env.PORT;

const URL = process.env.MONGODB_URL;

// Connecting MongoDB

const main =()=>{
    mongoose.connect(URL)
    .then(() => {
        console.log("MongoDB is connected");
    }).catch((error) => {
        console.log("Error connecting to MongoDB:", error);
    });

}
 main();


 //middelwares
 app.use(express.json())
 app.use(cookieParser());

 


app.get('/', (req, res) => {
    res.json({egg :"Welcome to the server"} ); 
});
app.get('/users', (req, res) => {
    res.json({egg :"user home page"} ); 
});



//routes
app.use('/users',users);

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});



// {
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }


