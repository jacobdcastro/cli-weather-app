const key = 'ecf9d92f69e278b096fa2733e3809116';

const setURL = input => {
  let inputType;

  if (isNaN(input) === false) {
    inputType = 'zip';
  } else if (isNaN(input)) {
    inputType = 'q';
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?APPID=${key}&${inputType}=${input}&units=imperial`;

  return url;
};

module.exports = setURL;
