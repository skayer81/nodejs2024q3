import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { resolve } from 'path';
import { EventEmitter } from '../eventEmitter/eventEmitter.js';
import { OutputHandler } from '../outputHandler/outputHandler.js';
import { FilePathUtils } from '../filePathUtils/filePathUtils.js';

export class HASHCalculator{

    #eventEmitter = new EventEmitter()

    constructor(){
      this.#eventEmitter.on(this.#eventEmitter.events.hash, this.calculateHash)
    }
     
    async calculateHash(filePath) {
      try{
        FilePathUtils.checkPathIsEmpty(filePath);
        filePath = resolve(filePath);
        const hash = createHash('sha256');
        const fileStream = createReadStream(filePath);
        fileStream
          .on('data', (chunk) => {
            hash.update(chunk);
          })
          .on('end', () => {
            OutputHandler.showResult(`HASH: ${hash.digest('hex')}`);
          })
          .on('error', (error) => {
           OutputHandler.showOperationError(error);
          })
          .on('close', () => {
            OutputHandler.showCurrentDir();
           })
      }
      catch(error){
        OutputHandler.showOperationError(error);
      }
    };
 } 