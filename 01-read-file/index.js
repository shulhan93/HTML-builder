const path = require('path');
const fs = require('fs')

const stream = new fs.ReadStream(path.join(__dirname,  'text.txt'), {encoding: 'utf-8'});

stream.on('readable', ()=> {
  const data = stream.read()
  if(data != null)console.log(data);
})

stream.on('end', ()=> {
  console.log('The end')
})