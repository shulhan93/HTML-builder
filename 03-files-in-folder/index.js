const path = require("path");
const fs = require("fs");

fs.readdir(
  path.resolve(__dirname, "secret-folder"),
  { withFileTypes: true },
  (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        if (!file.isDirectory()) {
          let name = path.basename(path.resolve(__dirname, file.name));
          name = name.substring(0, name.lastIndexOf("."));
          let ext = path.extname(path.resolve(__dirname, file.name));
          let size;
          fs.stat(
            path.join(__dirname, "secret-folder", file.name),
            (err, stats) => {
              if (err) {
              } else {
                size = stats.size;
                console.log(`${name} - ${ext.slice(1)} - ${size}kb`);
              }
            }
          );
        }
      });
    }
  }
);
