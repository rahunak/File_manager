import zlib, { createBrotliDecompress } from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import path from 'path';
import fs from 'node:fs/promises';

async function decompressFunc(pathToFile, pathToDestination) {
  if (pathToFile === undefined || pathToDestination === undefined) {
    console.error('Operation failed - Invalid input');
    return;
  }

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
