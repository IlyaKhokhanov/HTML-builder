const path = require('path');
const fs = require('fs');

const pathProject = path.resolve(__dirname, 'project-dist');

removeProjDir();

function removeProjDir() {
  fs.rm(pathProject, { recursive: true, force: true }, (err) => {
    if (err) throw err;
    createProj();
  });
}

function createProj() {
  fs.mkdir(pathProject, (err) => {
    if (err) throw err;
  });

  copyStyles();
  copyAssets();
  createHtml();
}

function copyStyles() {
  const pathStyles = path.resolve(__dirname, 'styles');

  const writeStream = fs.createWriteStream(path.join(pathProject, 'style.css'));

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
}

function copyAssets() {
  const pathAssets = path.resolve(__dirname, 'assets');
  const pathFilesCopy = path.join(pathProject, 'assets');

  fs.mkdir(pathFilesCopy, (err) => {
    if (err) throw err;
  });

  fs.readdir(pathAssets, (err, directories) => {
    if (err) throw err;
    directories.forEach((dir) => {
      fs.mkdir(path.join(pathFilesCopy, dir), (err) => {
        if (err) throw err;
      });
      fs.readdir(path.join(pathAssets, dir), (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
          fs.copyFile(
            path.join(pathAssets, dir, file),
            path.join(pathFilesCopy, dir, file),
            (err) => {
              if (err) throw err;
            }
          );
        });
      });
    });
  });
}

function createHtml() {
  const pathComponents = path.resolve(__dirname, 'components');

  let template = '';

  const readStream = fs.createReadStream(
    path.resolve(__dirname, 'template.html')
  );

  readStream.on('data', (chunk) => (template += chunk));
  fs.readdir(pathComponents, { withFileTypes: true }, (err, files) => {
    files.forEach((file) => {
      if (path.extname(file.name) === '.html' && file.isFile()) {
        fs.readFile(path.join(pathComponents, file.name), (err, data) => {
          if (err) throw err;
          const writeStream = fs.createWriteStream(
            path.join(pathProject, 'index.html')
          );
          template = template.replace(`{{${file.name.split('.')[0]}}}`, data);
          writeStream.write(template);
        });
      }
    });
  });
}
