const path = require('path');
const fs = require('fs');

const { stdout, stderr } = process;

let data = '';
const readStream = fs.createReadStream(path.resolve(__dirname, 'text.txt'));
readStream.on('data', (chunk) => (data += chunk));
readStream.on('end', () => stdout.write(data));
readStream.on('error', () => stderr.write('Error'));
