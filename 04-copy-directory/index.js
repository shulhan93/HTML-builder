const path = require("path");
const fs = require("fs/promises");

async function copyDir() {
  const srcDir = path.join(__dirname, "files");
  const outputDir = path.join(__dirname, "files-copy");

  const files = await fs.readdir(srcDir, {
    withFileTypes: true,
  });

  await fs.mkdir(outputDir, { recursive: true });

  for (let file of files) {
    const nameFile = path.basename(file.name);
    await fs.copyFile(
      path.join(__dirname, "files", `${nameFile}`),
      path.join(__dirname, "files-copy", `${nameFile}`)
    );
  }
}

copyDir();
