import zlib, { createBrotliCompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import path from 'path';
import fs from 'node:fs/promises';

/**
 * Compresses the file at the specified path using Brotli compression algorithm
 * and saves it to the destination path.
 *
 * @param {string} pathToFile - the path to the file to be compressed
 * @param {string} pathToDestination - the path to the destination directory
 * where the compressed file will be saved
 * @return {Promise<void>} A Promise that resolves when the compression
 * is complete, or rejects if an error occurs
 */
async function compressFunc(pathToFile, pathToDestination) {
  if (pathToFile === undefined || pathToDestination === undefined) {
    console.error('Operation failed - Invalid input');
    return;
  }

  /**
   * Asynchronously compresses the input and writes
   * the result to the output using the Brotli algorithm.
   *
   * @param {string} input - The input file path to be compressed.
   * @param {string} output - The output file path where the compressed data will be written.
   * @return {Promise<void>} A Promise that resolves when the compression is complete.
   */
  async function brotliCompress(input, output) {
    let expectedInputSize = 0;
    const stats = await fs.stat(pathToFile);
    expectedInputSize = stats.size;

    // params uses for optimization
    const brotliStream = await createBrotliCompress({
      chunkSize: 32 * 1024,
      params: {
        [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_GENERIC,
        [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
        [zlib.constants.BROTLI_PARAM_SIZE_HINT]: expectedInputSize,
      },
    });

    const source = await createReadStream(input);
    const destination = await createWriteStream(output, { flags: 'wx' });
    await pipeline(source, brotliStream, destination);
  }

  try {
    // Use .br extension for Brotli compression
    const fileName = path.basename(pathToFile);
    await brotliCompress(pathToFile, path.join(pathToDestination, `${fileName}.br`));
  }
  catch (err) {
    console.error('Operation failed', err);
  }
}
export default compressFunc;
