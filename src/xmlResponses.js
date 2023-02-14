const respondXML = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'text/xml',
  };

  const xmlString = `
    <response>
      <message>${object.message}</message>
      <id>${object.id}</id>
    </response>
  `;

  response.writeHead(status, headers);
  response.write(xmlString);
  response.end();
};

module.exports = {
  respondXML,
};
