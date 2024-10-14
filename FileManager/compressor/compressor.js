  import { join, resolve, dirname, basename, extname } from 'path';
  import { createReadStream, createWriteStream } from 'fs';
  import { BrotliCompress, BrotliDecompress } from 'zlib';
  import { pipeline } from 'node:stream';
  import { EventEmitter } from '../eventEmitter/eventEmitter.js';
  import { FilePathUtils } from '../filePathUtils/filePathUtils.js';
  import { OutputHandler } from '../outputHandler/outputHandler.js';
  
  export class Compressor {
      #eventEmitter = new EventEmitter();
      #operations = {
        compress : 'compress',
        decompress : 'decompress'
      }
      #output = {
        compress : 'Compression',
        decompress : 'Decompression',
        complet: 'completed successfully',
      }
      #extname = {
        compressed:  '.gz',
        decompressed: '.txt' 
      }
  
      constructor() {
        this.#eventEmitter.on(this.#eventEmitter.events.compress, this.compress);
        this.#eventEmitter.on(this.#eventEmitter.events.decompress, this.decompress);
      }
  
      async handleStream(paths, operation) {
        try {
          let [filePath, newDir] = FilePathUtils.getPaths(paths);
          FilePathUtils.checkPathIsEmpty(filePath, true);
          newDir = newDir ? resolve(newDir) : dirname(filePath);
  
          const readStream = createReadStream(resolve(filePath));
          const writeStream = createWriteStream(join(newDir, `${basename(filePath, extname(filePath))}${operation === this.#operations.compress ? this.#extname.compressed : this.#extname.decompressed}`));
          const transformStream = operation === this.#operations.compress ? BrotliCompress() : BrotliDecompress();
  
          pipeline(readStream, transformStream, writeStream, (error) => {
            if (error) {
              OutputHandler.showOperationError(error);
            } else {
              OutputHandler.showResult(`${operation === this.#operations.compress ? this.#output.compress : this.#output.decompress} ${this.#output.complet}`)  
            }
            OutputHandler.showCurrentDir()
          });
        } catch (error) {
          OutputHandler.showOperationError(error);
          OutputHandler.showCurrentDir()
        } 
      }
  
      compress = (paths) => this.handleStream(paths, this.#operations.compress);
  
      decompress = (paths) => this.handleStream(paths, this.#operations.decompress);
  }