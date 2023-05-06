const path = require('path');
const fs = require('fs');

const stream = new fs.createReadStream(path.join(__dirname,  'text.txt'), 'utf-8');

stream.on('data', (chunk) => {
  console.log(chunk);
});

stream.on('error', error => console.log('Error', error.message));
