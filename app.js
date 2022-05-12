//plugins
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const articleRoute = require('./routes/articles');
const userRoute= require('./routes/login')
const commentRoute = require('./routes/comment')
const messageRoute = require('./routes/message')
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerExpress= require('swagger-ui-express');
const { application } = require('express');
const cors = require('cors');
require('dotenv/config');

// Extend swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'Brand API',
            version: "1.0.0",
            description :'My brand api information'
        },
       
            server: ['https//localhost:7005']

        ,

    },
 apis :['./routes/*.js']
}
const swaggerDocs = swaggerJsDoc (swaggerOptions);
app.use('/api-swagger',swaggerExpress.serve, swaggerExpress.setup(swaggerDocs));



//All schema 
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
  app.use(cors(corsOpts));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.header('Access-Control-Allow-Credentials', true);
   
    next();
});


//routes
app.use(express.static('uploads'));
app.use(bodyParser.json())
app.use('/api', articleRoute);
app.use('/api', messageRoute);
app.use('/api', userRoute);
app.use('/api',commentRoute);
let port =process.env.PORT || 7005;

app.listen(port,'0.0.0.0', () => {
    console.log(`server start at ${port}` );
    mongoose.connect( `${process.env.DB_CONNECTION}`, {useNewUrlParser:true},()=>
 console.log ("Sucessful Connect to DB"));
});

module.exports = app;


