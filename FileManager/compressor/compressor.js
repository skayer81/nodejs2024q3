import { join, resolve } from 'path';

import { dirname, basename, extname } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { BrotliCompress, BrotliDecompress } from 'zlib';
import { pipeline } from 'node:stream';
import { EventEmitter } from '../eventEmitter/eventEmitter.js';
import { FilePathUtils } from '../filePathUtils/filePathUtils.js';
import { OutputHandler } from '../outputHandler/outputHandler.js';

// Compress file (using Brotli algorithm, should be done using Streams API)
// compress path_to_file path_to_destination
// Decompress file (using Brotli algorithm, should be done using Streams API)
// decompress path_to_file path_to_destination

export class Compressor{

    #eventEmitter = new EventEmitter()

    constructor(){
      this.#eventEmitter.on(this.#eventEmitter.events.compress, this.compress)
      this.#eventEmitter.on(this.#eventEmitter.events.decompress, this.decompress)
    }
     
    compress = async (paths) => {
        try {
           let [filePath, newDir] = FilePathUtils.getPaths(paths);
        if (!newDir) {
            newDir = dirname(filePath)
        }
        const readStream = createReadStream(resolve(filePath));
        const writeStream = createWriteStream(join(resolve(newDir), `${basename(filePath, extname(filePath))}.gz`));
        const brotliStream = BrotliCompress();
        pipeline(readStream, brotliStream, writeStream, (error) => {
            if (error) {
                console.error(error);
            }
        });
        }
        catch(error){
            console.error(error);
        }
        finally{
            console.log('типа путь')
        }
    };

    decompress = async (paths) => {
        try {
           let [filePath, newDir] = FilePathUtils.getPaths(paths);
        if (!newDir) {
            newDir = dirname(filePath)
        }
        const readStream = createReadStream(resolve(filePath));
        const writeStream = createWriteStream(join(resolve(newDir), `${basename(filePath, extname(filePath))}.txt`));
        const brotliStream = BrotliDecompress();
        console.log(resolve(filePath))
        console.log(join(resolve(newDir), `${basename(filePath, extname(filePath))}.txt`))
        pipeline(readStream, brotliStream, writeStream, (error) => {
            if (error) {
                console.error(error);
            }
        });
        }
        catch(error){
            console.error(error);
        }
        finally{
            console.log('типа путь')
        }
    };

    // decompress = async () => {
    //     const fileName = 'fileToCompress.txt';
    //     const archiveName = 'archive.gz';
    //     const dir = join(dirname(fileURLToPath(import.meta.url)), 'files')
    //     const gzip = createGunzip();
    //     const source = createReadStream(join(dir, archiveName));
    //     const destination = createWriteStream(join(dir, fileName));
    //     pipeline(source, gzip, destination, (err) => {
    //         if (err) {
    //             console.error(err);
    //         }
    //     });
    // };
    
 } 