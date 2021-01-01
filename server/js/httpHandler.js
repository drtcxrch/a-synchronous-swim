const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messages = null;
module.exports.initialize = (queue) => {
  messages = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  // console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // let message = messages.dequeue() || '';
  // console.log(res);
  // console.log('request is', req);
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }

  if (req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200, headers);
      var message = messages.dequeue();
      if (message) {
        res.end(message);
      } else {
        res.end();
      }
    } else if (req.url === '/background.jpg') {
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if (err) {
          res.writeHead(404);
        } else {
          res.writeHead(200, {
            'Content- Type': 'image / jepg',
            'Content-Length': data.length
          });
          res.write(data, 'binary');
        }
        res.end();
        next();
      })

    }
  }

  if (req.method === 'POST' && req.url === '/background.jpg') {
    var fileData = Buffer.alloc(0);

    req.on('data', (chunk) => {
      fileData = Buffer.concat([fileData, chunk]);
    });

    req.on('end', () => {
      var file = multipart.getFile(fileData);


      fs.writeFile(module.exports.backgroundImageFile, file.data, (err) => {
        res.writeHead(err ? 400 : 201, headers);
        res.end();
        next();
      });
    });
  }
};

