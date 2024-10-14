import { createReadStream, createWriteStream } from 'fs';
import { dirname, basename } from 'path';
import { cwd } from 'node:process';
import { EventEmitter } from '../eventEmitter/eventEmitter.js';
import { resolve, join } from 'node:path';
import { rename, rm, open } from 'node:fs/promises';
import { FilePathUtils } from '../filePathUtils/filePathUtils.js';
import { OutputHandler } from '../outputHandler/outputHandler.js';
export class FileSystems {
    #messages = {
      isFileDel: 'file deleted',
      isFileCreate: 'file created',
      outputFileStart: 'file reading start',
      outputFileEnd: 'file reading completed',
      rename: 'file renamed'
    }

    #eventEmitter= new EventEmitter()

    constructor() {
      this.#eventEmitter.on(this.#eventEmitter.events.rm, this.removeFile);  
      this.#eventEmitter.on(this.#eventEmitter.events.cp, this.copyFile);
      this.#eventEmitter.on(this.#eventEmitter.events.mv, this.moveFile);
    }

    copyFile = async (paths) => {
      try {
        let [filePath, newDir] = FilePathUtils.getPaths(paths);
        FilePathUtils.checkPathIsEmpty(filePath , true);
        FilePathUtils.checkPathIsEmpty(newDir)
        filePath = resolve(filePath);
        newDir = resolve(newDir);
        const writeStream = createWriteStream(resolve(newDir, basename(filePath)));
        const readStream = createReadStream(filePath)
          .on('error', (error) => {
            OutputHandler.showOperationError(error);
          });

        readStream.pipe(writeStream);
        writeStream.on('finish', () => OutputHandler.showResult('copying completed'));
        writeStream.on('error', (error) => OutputHandler.showOperationError(error));
        writeStream.on('close', () => OutputHandler.showCurrentDir());
      } catch (error) {
        OutputHandler.showOperationError(error);
      }
    };




 

    removeFile = async (filePath) => {
      try {
        FilePathUtils.checkPathIsEmpty(filePath, true);
        filePath = FilePathUtils.getResolvePath(filePath); //resolve(filePath);
        await rm(filePath);
        OutputHandler.showResult(this.#messages.isFileDel);
      } catch (error) {
        OutputHandler.showOperationError(error);
      }
      OutputHandler.showCurrentDir();
    };

    moveFile = async (paths) => {
      try {
        let [filePath, newDir] = FilePathUtils.getPaths(paths);
        filePath = resolve(filePath);
        newDir = resolve(newDir);
        const writeStream = createWriteStream(resolve(newDir, basename(filePath)));

        const readStream = createReadStream(filePath)
          .on('error', (error) => {
            OutputHandler.showOperationError(error);
          });

        readStream.pipe(writeStream);

        writeStream.on('finish', () => {
          OutputHandler.showResult('copying completed');
          this.removeFile(filePath);
        });
        writeStream.on('error', (error) => OutputHandler.showOperationError(error));
        writeStream.on('close', () => OutputHandler.showCurrentDir());
      } catch (error) {
        OutputHandler.showOperationError(error);
      }
    }
}