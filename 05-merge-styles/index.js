const path = require('path');
const fs = require('fs/promises');

const dirSrc = path.join(__dirname, 'styles');
const dirDist = path.join(__dirname, 'project-dist');

const getStyles = async () => {
  const styles = (await fs.readdir(dirSrc)).filter(
    (file) => path.extname(file) === '.css'
  );

  return styles;
};

const createBuildFile = async () => {
  await fs.open(path.join(dirDist, 'bundle.css'), 'w');
  return path.join(dirDist, 'bundle.css');
};

const buildCssBundle = async () => {
  const cssBundle = await createBuildFile();
  const styles = await getStyles();
  for (let style of styles) {
    const data = await fs.readFile(path.join(dirSrc, style));

    await fs.appendFile(cssBundle, data);
  }
};

buildCssBundle();
