const path = require('path');
const fs = require('fs/promises');

const dir = path.join(__dirname, 'secret-folder');

async function getFiles(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });

  for (let file of files) {
    if (!file.isDirectory()) {
      let name = path.basename(file.name, path.extname(file.name));
      let ext = path.extname(file.name).slice(1);
      let stat = await fs.stat(path.resolve(dir, file.name));

      console.log(`${name} - ${ext} - ${stat.size}kb`);
    }
  }
}
getFiles(dir);
