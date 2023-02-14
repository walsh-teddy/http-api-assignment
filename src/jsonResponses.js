const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const jsonResponse = JSON.stringify(object);

  response.writeHead(status, headers);
  response.write(jsonResponse);
  response.end();
};

module.exports = {
  respondJSON,
};
