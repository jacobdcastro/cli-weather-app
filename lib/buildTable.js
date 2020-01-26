const Table = require('cli-table2');
const Colors = require('colors');
const windDirection = require('./windDirection.js');

// 6. once all data is recieved, print the table to the console
const buildTable = (city, temp, desc, hum, windSpd, windDir) => {
  const time = Date();

  let table = new Table({
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

module.exports = buildTable;
