//import  http protocol
var http = require('http');

var exp = require('express'); 

var parse = require('body-parser');

//imports all app files into server
var app = require('./app');

//assigns a port on which the project will run on
var port = 2000; 

//setup server
var svr = http.createServer(app);

//listens on port and listens to function passed to createServer
svr.listen(2000);
