const https = require('https');
const http = require('http');
const readline = require('readline');
const Table = require('cli-table2');
const Colors = require('colors');

const key = '249ad9bf13a489eef80dba6c78c933be';
var inputType = '';
var url = '';
const time = Date();

// 6. once all data is recieved, print the table to the console
const buildTable = (city, temp, desc, hum, windSpd, windDir) => {
  var table = new Table({
    head: [{ colSpan: 2, content: 'Weather!' }],
    colWidths: [14, 20],
  });

  table.push(
    [{ colSpan: 2, content: time }],
    ['Area:', city],
    ['Temperature:', `${temp} F`],
    ['Sky:', desc],
    ['Wind:', `${windSpd}mph ${windDirection(windDir)}`],
    ['Humidity', `${hum}%`]
  );
  console.log(table.toString());
};

const printError = error => {
  console.error(error.response);
};

// 2. get the weather data in a specific location
const getData = (url, input) => {
  // const readableQuery = query.replace('_', ' ');
  var request = https.get(url, response => {
    try {
      // 3.1 only run if fetch was successful
      if (response.statusCode === 200) {
        let body = '';

        // 4. put data into empty body variable
        response.on('data', data => {
          try {
            body += data;
          } catch (error) {
            printError(error);
          }
        });

        // 5. once data is finished being retrieved,
        //    parse the JSON and send datapoints to buildTable() function
        response.on('end', () => {
          try {
            const data = JSON.parse(body);
            if (data.name) {
              buildTable(
                data.name,
                data.main.temp,
                data.weather[0].main,
                data.main.humidity,
                data.wind.speed,
                data.wind.deg
              );
              // console.log(data);
            } else {
              const queryError = new Error(
                `The location ${input} doesn't exist!`
              );
              console.log(queryError);
            }
          } catch (error) {
            printError(error);
          }
        });
      } else {
        const statusCodeError = new Error(
          `There was an error getting the message. (${
            http.STATUS_CODES[response.statusCode]
          })`
        );
        console.error(statusCodeError);
      }
      // request.on('error', printError(error.message));
    } catch (error) {
      printError(error);
    }
  });
};

const windDirection = dir => {
  var x = parseFloat(dir);
  if ((x > 335.0 && x <= 365.0) || (x > 0 && x <= 25.0)) {
    return 'N';
  } else if (x > 25.0 && x <= 65.0) {
    return 'NE';
  } else if (x > 65.0 && x <= 115.0) {
    return 'E';
  } else if (x > 115.0 && x <= 155.0) {
    return 'SE';
  } else if (x > 155.0 && x <= 205.0) {
    return 'S';
  } else if (x > 205.0 && x <= 245.0) {
    return 'SW';
  } else if (x > 245.0 && x <= 295.0) {
    return 'W';
  } else if (x > 295.0 && x <= 335.0) {
    return 'NW';
  } else if (x === 0) {
    return '';
  } else {
    return '';
  }
};

const setURL = input => {
  if (isNaN(input) === false) {
    // console.log(input);
    // console.log('Is a number!');
    inputType = 'zip';
  } else if (isNaN(input)) {
    // console.log(input);
    // console.log('Not a number!');
    inputType = 'q';
  }
  url = `https://api.openweathermap.org/data/2.5/weather?APPID=${key}&${inputType}=${input}&units=imperial`;
  getData(url, input);
};

// 1. ask for zip code to search for in api
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('');
rl.question('Enter a city name or zip code for the weather! => ', input => {
  setURL(input);
  rl.close();
});
