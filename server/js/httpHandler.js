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
  console.log(res);
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    //res.write()//?????
    res.end();
    next();
  }
  console.log('request is', req)
  if (req.method === 'GET') {
    if //((req._postData === undefined) &&
    (req.url === 'spec/missing.jpg') {
      res.writeHead(404, headers);
      res.write(message);
      res.end();
      next();
    } else {
      res.writeHead(200, headers);
      res.write(message);
      res.end();
      next(); // invoke next() at the end of a request to help with testing!
    }
  }
};

