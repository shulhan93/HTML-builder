const path = require('path');
const fs = require('fs/promises');

const copyDir = async (srcFolder, distFolder) => {

  const files = await fs.readdir(srcFolder, {
    withFileTypes: true,
  });

  await fs.mkdir(distFolder, { recursive: true });

  for (let file of files) {
    await fs.copyFile(
      path.join(srcFolder, `${file.name}`),
      path.join(distFolder, `${file.name}`)
    );
  }
};

copyDir(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));
