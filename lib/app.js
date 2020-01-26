const readline = require('readline');
const setURL = require('./setURL.js');
const getData = require('./getData.js');
const buildTable = require('./buildTable.js');

const runApp = input => {
  const url = setURL(input);
  const data = getData(url, input);

  console.log(data);

  buildTable(
    data.name,
    data.main.temp,
    data.weather[0].main,
    data.main.humidity,
    data.wind.speed,
    data.wind.deg
  );

  rl.close();
};

module.exports = runApp;
