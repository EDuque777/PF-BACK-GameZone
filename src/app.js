const express = require('express');
const cloudinary = require('cloudinary').v2
const fileUpload = require('express-fileupload') 
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const session = require("express-session")

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(session(
  {
    secret:'secret', // Debería estar en un archivo de environment
    resave:false,
    saveUninitialized:false, 
  }
))
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Hola esto es una Prueba


server.use((err, req, res, next) => { 
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

//middleware
server.use(express.json())
server.use(fileUpload({
  useTempFiles: true,
  limits: {fileSize: 50 * 2024 *1024}
}))

cloudinary.config({ 
cloud_name: 'dcebtiiih', 
api_key: '324181695454949', 
api_secret: '6ll-08fqsoIWQKiunEvRmU9aGl8' 
});

module.exports = server;
