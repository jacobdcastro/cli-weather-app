const setURL = input => {
  const key = '249ad9bf13a489eef80dba6c78c933be';
  let inputType = '';
  let url = '';

  if (isNaN(input) === false) {
    inputType = 'zip';
  } else if (isNaN(input)) {
    inputType = 'q';
  }
  return (url = `https://api.openweathermap.org/data/2.5/weather?APPID=${key}&${inputType}=${input}&units=imperial`);
};

export default setURL;
