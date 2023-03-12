const downloadFile = require('./downloader.js');

// Define the URLs to download
const urls = [
  'https://dappit.nl/loremipsum-234b.txt',
  'https://dappit.nl/loremipsum-327b.txt',
  'https://dappit.nl/loremipsum-567b.txt',
  'https://dappit.nl/loremipsum-836b.txt',
];

// Create an array of promises for all downloads
const promises = urls.map(downloadFile);

// Launch the downloads in parallel
Promise.all(promises)
  .then(() => {
    console.log('All downloads completed');
  })
  .catch(error => {
    console.error(`Error during download: ${error}`);
  });
