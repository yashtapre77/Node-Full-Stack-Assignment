import { promises as fsPromises } from 'fs';

process.on('exit', (code) => {
  console.log(`'exit' event called with code ${code}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

const readFileAsync = (filePath) => {
  return new Promise((resolve, reject) => {
    fsPromises.readFile(filePath, { encoding: 'utf8' })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

const incorrectFileName = 'nonexistent-file.txt';

readFileAsync(incorrectFileName)
  .then(data => {
    console.log('File content:', data);
  })
  .catch(error => {
    console.error('Error reading file:', error);

    throw new Error('Custom Error');
  });