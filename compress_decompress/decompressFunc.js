import zlib, { createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import path from 'path';
import fs from 'node:fs/promises';

/**
 * Asynchronous function to decompress a file using Brotli compression algorithm.
 *
 * @param {string} pathToFile - the path to the file to be decompressed
 * @param {string} pathToDestination - the path to the destination
 * directory for the decompressed file
 * @return {void} this function does not return a value
 */
async function decompressFunc(pathToFile, pathToDestination) {
  if (pathToFile === undefined || pathToDestination === undefined) {
    console.error('Operation failed - Invalid input');
    return;
  }

  /**
   * Asynchronously decompresses the input file using Brotli compression
   * and writes the result to the output file.
   *
   * @param {string} input - Path to the input file
   * @param {string} output - Path to the output file
   * @return {Promise<void>} A Promise that resolves when the decompression is complete
   */
  async function brotliDecompress(input, output) {
    const stats = await fs.stat(input);
    stats.isFile();
    const brotliUncompres = await createBrotliDecompress({
      chunkSize: 32 * 1024,
      params: {
        [zlib.constants.BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION]: true,
        [zlib.constants.BROTLI_DECODER_PARAM_LARGE_WINDOW]: true,
      },
    });

    const source = await createReadStream(input, { flags: 'r' });
    const destination = await createWriteStream(output, { flags: 'wx' });
    await pipeline(source, brotliUncompres, destination);
  }

  try {
    let fileName = path.basename(pathToFile);
    if (path.basename(pathToFile).split('.').length > 1) {
      fileName = path.basename(pathToFile).split('.').slice(0, -1).join('.');
    }
    await brotliDecompress(pathToFile, path.join(pathToDestination, fileName));
  }
  catch (err) {
    console.error('Operation failed', err);
  }
}
export default decompressFunc;
