const path = require("path");
const fs = require("fs/promises");

async function copyDir() {
  const files = await fs.readdir(path.join(__dirname, "files"), {
    withFileTypes: true,
  });

  await fs.mkdir(path.join(__dirname, "files-copy"));

  for (let file of files) {
    const nameFile = path.basename(file.name);
    await fs.copyFile(
      path.join(__dirname, "files", `${nameFile}`),
      path.join(__dirname, "files-copy", `${nameFile}`)
    );
  }
}

copyDir();
