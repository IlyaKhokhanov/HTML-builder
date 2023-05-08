const path = require('path');
const fs = require('fs');

const { stdout, stdin } = process;

const filePath = path.resolve(__dirname, 'text.txt');

fs.readdir(path.resolve(__dirname), (err, files) => {
  if (!files.includes('text.txt')) {
    fs.open(filePath, 'w', (err) => {
      if (err) throw err;
    });
  }
});

stdout.write('Please write what you want to write to the file text.txt\n');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.exit();
  }
  fs.appendFile(filePath, data, (err) => {
    if (err) throw err;
    stdout.write('Please write what you want to write to the file text.txt\n');
  });
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  stdout.write('Thanks for check!');
});
