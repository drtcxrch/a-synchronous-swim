const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  let message = messages.dequeue() || '';

  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    //res.write()//?????
    res.end();
    next();
  }
  if (req.method === 'GET') {
    res.writeHead(200, headers);
    res.write(message); // = message sent by server that is typed
    res.end();
    next(); // invoke next() at the end of a request to help with testing!
  }
};

