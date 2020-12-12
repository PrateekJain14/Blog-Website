const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');

// Express APIs
const   api         = require('./routes/auth.routes');
const  filesystem  = require('./routes/file.routes');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

// MongoDB conection
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, options  ).then(() => {
    console.log('Database connected')
},
    error => {
        console.log("Database can't be connected: " + error)
    }
)

// Remvoe MongoDB warning error
mongoose.set('useCreateIndex', true);


// Express settings
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

// Serve static resources
app.use('/', express.static('public'));
app.use('/api', api)
app.use('/filesystem', filesystem)




app.get("/*" , function(req,res){ 
    
    res.sendFile( __dirname + '/public/index.html' )


})
// Define PORT
const port = process.env.PORT || 8080;


 
 



const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// Express error handling
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong'));
    });
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});