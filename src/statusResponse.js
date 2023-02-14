const url = require('url');
const query = require('querystring');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const respondCorrectType = (request, response, status, object) => {
  // Find the type of content the request is looking for (either JSON or XML)
  const contentType = request.headers.accept;

  if (contentType === 'application/json') { // Its looking for JSON
    jsonHandler.respondJSON(request, response, status, object);
  } else if (contentType === 'text/xml') { // Its looking for XML
    xmlHandler.respondXML(request, response, status, object);
  } else { // Fallback (just do JSON)
    jsonHandler.respondJSON(request, response, status, object);
  }
};

const getSuccess = (request, response) => {
  const object = {
    message: 'Request was successful. Horay!',
    id: 'success',
  };
  respondCorrectType(request, response, 200, object);
};

const getBadRequest = (request, response) => {
  // Find if they have the query param "?valid=true"
  const parsedUrl = url.parse(request.url);
  const queryParameters = query.parse(parsedUrl.query);

  // Check if it has valud = "true'
  if (queryParameters.valid === 'true') { // It has a valid variable and is true
    getSuccess(request, response);
  } else { // It did not have the right query parameter
    const object = {
      message: 'Request failed because user was not valid',
      id: 'badRequest',
    };
    respondCorrectType(request, response, 400, object);
  }
};

const getUnauthorized = (request, response) => {
  // Find if they have the query param "?loggedIn=yes"
  const parsedUrl = url.parse(request.url);
  const queryParameters = query.parse(parsedUrl.query);

  // Check if loggedIn = "yes"
  if (queryParameters.loggedIn === 'yes') { // They are authorized
    getSuccess(request, response);
  } else { // They are not authorized
    const object = {
      message: 'Request failed because the user was not authenticated',
      id: 'unauthorized',
    };
    respondCorrectType(request, response, 401, object);
  }
};

const getForbidden = (request, response) => {
  const object = {
    message: 'Request failed because the user was not authorized to access that data',
    id: 'forbidden',
  };
  respondCorrectType(request, response, 403, object);
};

const getInternal = (request, response) => {
  const object = {
    message: 'Haha oops. Our bad',
    id: 'internal',
  };
  respondCorrectType(request, response, 500, object);
};

const getNotImplemented = (request, response) => {
  const object = {
    message: 'We didn\'t do this one yet. Hold on bro',
    id: 'notImplemented',
  };
  respondCorrectType(request, response, 501, object);
};

const notFound = (request, response) => {
  const object = {
    message: 'The page you are looking for was not found. GO CRY ABOUT IT',
    id: 'notFound',
  };

  respondCorrectType(request, response, 404, object);
};

module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
  notFound,
};
