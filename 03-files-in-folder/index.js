const path = require('path');
const fs = require('fs');

fs.readdir(path.resolve(__dirname, 'secret-folder'), (err, files) => {
  files.forEach((file) => {
    fs.stat(path.resolve(__dirname, 'secret-folder', file), (err, stats) => {
      if (stats.isFile()) {
        let arr = file.split('.');
        arr.push(stats.size + 'b');
        console.log(arr.join(' - '));
      }
    });
  });
});
