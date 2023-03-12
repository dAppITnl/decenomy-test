const axios = require('axios');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const externalFile = 'https://dappit.nl/loremipsum-234b.txt';

async function downloadFile(url) {
  const downloadedFileName = path.basename(url);
  const response = await axios.head(url); // Send a HEAD request to get the file size
  const remoteGzipped = response.headers['etag']
    ? response.headers['etag'].substr(-5,4) === "gzip"
    : false;
  const remoteSize = parseInt(response.headers['content-length'], 10);
  console.log(`remote ${downloadedFileName} filesize=${remoteSize} bytes`
             +` gzipped=${remoteGzipped}`);
  // Get the absolute path of the downloaded file
  const localFilePath = path.join(path.dirname(require.main.filename), downloadedFileName);

  if (fs.existsSync(localFilePath)) {
    const localSize = remoteGzipped
      ? (await new Promise((resolve, reject) => {
          // Gzip the local file and get its size
          const gz = zlib.createGzip();
          const inp = fs.createReadStream(localFilePath);
          const out = fs.createWriteStream(`${localFilePath}.gz`);
          inp.pipe(gz).pipe(out);
          out.on('close', () => {
            const gzippedSize = fs.statSync(`${localFilePath}.gz`).size;
            fs.unlinkSync(`${localFilePath}.gz`);
            resolve(gzippedSize);
          });
          out.on('error', reject);
        }))
      : fs.statSync(localFilePath).size;

    console.log(`File ${downloadedFileName} exists locally, localSize=${localSize} bytes`);
    if (remoteSize === localSize) {
      console.log(`File ${downloadedFileName} already downloaded with the same size.`);
      return;
    } else {
      console.log(`File ${downloadedFileName} exists, but with different size: download again.`);
    }
  } else {
    console.log(`File ${downloadedFileName} does not exist, download it.`);
  }

  const writer = fs.createWriteStream(localFilePath);
  const { data } = await axios.get(url, {
    responseType: 'stream',
  }); // Send a GET request to download the file

  data.pipe(writer); // write (efficient) locally

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

/*downloadFile(externalFile)
  .then(() => { console.log('All done!'); })
  .catch((error) => { console.error('An error occurred:', error); });
*/
module.exports = downloadFile;