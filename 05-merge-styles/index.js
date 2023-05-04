const path = require('path');
const fs = require('fs');

const pathStyles = path.resolve(__dirname, 'styles');

const writeStream = fs.createWriteStream(
  path.resolve(__dirname, 'project-dist', 'bundle.css')
);

fs.readdir(pathStyles, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    if (path.extname(file.name) === '.css' && file.isFile()) {
      fs.readFile(path.join(pathStyles, file.name), (err, data) => {
        if (err) throw err;
        writeStream.write(data);
      });
    }
  });
});
