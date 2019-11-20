const readline = require('readline');
const runApp = require('../lib/app');
const initMsg = `Enter a city name or zip code for the weather! => `;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('');

// 1. ask for zip code to search for in api
rl.question(initMsg, input => runApp(input));
