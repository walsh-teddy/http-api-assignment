// Set up directories
const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const statusHandler = require('./statusResponse.js');

// Tests if there is any port other than 3000 it should be using
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Urls with each method it should use
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS, // Alows the page to actually use the css (it wasn't before)
  '/success': statusHandler.getSuccess,
  '/badRequest': statusHandler.getBadRequest,
  '/unauthorized': statusHandler.getUnauthorized,
  '/forbidden': statusHandler.getForbidden,
  '/internal': statusHandler.getInternal,
  '/notImplemented': statusHandler.getNotImplemented,
  notFound: statusHandler.notFound,
};

// Called every time the server recieves a request from the client
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url).pathname;
  console.log(parsedUrl);

  if (urlStruct[parsedUrl]) {
    urlStruct[parsedUrl](request, response);
  } else {
    urlStruct.notFound(request, response);
  }
};

// Create the server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
