const https = require('https');
const http = require('http');

const printError = err => {
  console.error(err);
};

// 2. get the weather data in a specific location
const getData = (url, input) => {
  // const readableQuery = query.replace('_', ' ');
  const request = https.get(url, async response => {
    let body = '';

    try {
      // 4. put data into empty body variable
      response.on('data', data => (body += data));

      // 5. once data is finished being retrieved,
      //    parse the JSON and send datapoints to buildTable() function
      response.on('end', () => {
        try {
          const data = JSON.parse(body);
          if (data.name) {
            return data;
          } else {
            const queryError = new Error(
              `The location ${input} doesn't exist!`
            );
            printError(queryError);
          }
        } catch (error) {
          printError(error);
        }
      });
    } catch (error) {
      const statusCodeError = new Error(
        `There was an error getting the message. (${
          http.STATUS_CODES[response.statusCode]
        })`
      );
      printError(statusCodeError);
    }
  });

  return request;
};

export default getData;
