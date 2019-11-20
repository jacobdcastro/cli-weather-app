const setURL = require('./setURL');
const getData = require('./getData');
const buildTable = require('./buildTable');

module.exports = runApp = async input => {
  try {
    const url = await setURL(input);
    const data = await getData(url, input);

    buildTable(
      data.name,
      data.main.temp,
      data.weather[0].main,
      data.main.humidity,
      data.wind.speed,
      data.wind.deg
    );

    rl.close();
  } catch (error) {}
};
