const path = require('path');
const fs = require('fs');

const pathFiles = path.resolve(__dirname, 'files');
const pathFilesCopy = path.resolve(__dirname, 'files-copy');

function removeDir() {
  fs.rm(pathFilesCopy, { recursive: true, force: true }, (err) => {
    if (err) throw err;
    copyDir();
  });
}

function copyDir() {
  fs.mkdir(pathFilesCopy, (err) => {
    if (err) throw err;
  });

  fs.readdir(pathFiles, (err, files) => {
    files.forEach((file) => {
      fs.copyFile(
        path.join(pathFiles, file),
        path.join(pathFilesCopy, file),
        (err) => {
          if (err) throw err;
        }
      );
    });
  });
}

removeDir();
