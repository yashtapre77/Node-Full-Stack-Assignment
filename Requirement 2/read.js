import fs from 'fs/promises';

const filePath = 'poem.txt';

fs.readFile(filePath, 'utf8')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error("Error reading the file:", err);
  });