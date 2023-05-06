const path = require('path');
const fs = require('fs');
const process = require('node:process');

const writeableStream = fs.createWriteStream(
  path.resolve(__dirname, 'txt.txt')
);
process.stdout.write('Hello, write some a text... \n');

process.stdin.on('data', (data) => {
  if (data.toString().trim() == 'exit') {
    process.stdout.write('----- Прощай ------ \n');
    process.exit();
  }
  writeableStream.write(data);
});

process.on('SIGINT', () => {
  process.stdout.write('----- Прощай ------ \n');
  process.exit();
});
