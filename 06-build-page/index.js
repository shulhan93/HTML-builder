const path = require('path');
const fs = require('fs/promises');

const dist = path.join(__dirname, 'project-dist');

const createDistFolder = async () => {
  await fs.mkdir(dist, { recursive: true });
};

const copyAssets = async (currentPath, folder) => {
  const files = await fs.readdir(path.join(currentPath), {
    withFileTypes: true,
  });

  for (let file of files) {
    if (file.isDirectory()) {
      await fs.mkdir(path.join(dist, folder, file.name), { recursive: true });
      await copyAssets(path.join(currentPath, file.name), file.name);
    } else {
      await fs.copyFile(
        path.join(currentPath, file.name),
        path.join(dist, 'assets', folder, file.name)
      );
    }
  }
};

const getStyles = async (srcDir) => {
  const styles = (await fs.readdir(srcDir)).filter(
    (file) => path.extname(file) === '.css'
  );
  return styles;
};

const bundleCss = async (srcDir, nameCss) => {
  await fs.open(path.join(dist, nameCss), 'w');
  const styles = await getStyles(srcDir);
  for (let style of styles) {
    const data = await fs.readFile(path.join(srcDir, style));
    await fs.appendFile(path.join(dist, nameCss), data);
  }
};

const bundleHTML = async (srcDir, fileHTML) => {
  let htmlText = await fs.readFile(fileHTML, 'utf-8');
  const components = await fs.readdir(srcDir, { withFileTypes: true });

  for (let component of components) {
    const nameComponent = component.name.replace(/.html/, '');
    const componentText = await fs.readFile(
      path.join(srcDir, component.name),
      'utf-8'
    );
    htmlText = htmlText.replace(
      new RegExp(`{{${nameComponent}}}`, 'g'),
      componentText
    );
  }
  await fs.writeFile(path.join(dist, 'index.html'), htmlText);
};

const app = async () => {
  createDistFolder();
  bundleCss(path.join(__dirname, 'styles'), 'style.css');
  copyAssets(path.join(__dirname, 'assets'), 'assets');
  bundleHTML(
    path.join(__dirname, 'components'),
    path.join(__dirname, 'template.html')
  );
};

app();
