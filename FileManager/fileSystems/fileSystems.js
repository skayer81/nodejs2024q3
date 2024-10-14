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
    }

    #eventEmitter= new EventEmitter()

    constructor() {
      this.#eventEmitter.on(this.#eventEmitter.events.add, this.addFile);
      this.#eventEmitter.on(this.#eventEmitter.events.rm, this.removeFile);
      this.#eventEmitter.on(this.#eventEmitter.events.rn, this.renameFile);
      this.#eventEmitter.on(this.#eventEmitter.events.cat, this.outputFile);
      this.#eventEmitter.on(this.#eventEmitter.events.cp, this.copyFile);
      this.#eventEmitter.on(this.#eventEmitter.events.mv, this.moveFile);
    }

    copyFile = async (paths) => {
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
        writeStream.on('finish', () => OutputHandler.showResult('copying completed'));
        writeStream.on('error', (error) => OutputHandler.showOperationError(error));
        writeStream.on('close', () => OutputHandler.showCurrentDir());
      } catch (error) {
        OutputHandler.showOperationError(error);
      }
    };

    outputFile = async (path) => {
      try {
        path = resolve(path);
        OutputHandler.showResult(this.#messages.outputFileStart);

        const fileStream = createReadStream(path);

        fileStream
          .on('data', (chunk) => OutputHandler.showFileText(chunk))
          .on('end', () => OutputHandler.showResult(this.#messages.outputFileEnd))
          .on('error', (error) => OutputHandler.showOperationError(error))
          .on('close', () => OutputHandler.showCurrentDir());
      } catch (error) {
        OutputHandler.showOperationError(error);
      }
    };

    renameFile = async (paths) => {
      try {
        let [filePath, newName] = FilePathUtils.getPaths(paths);
        FilePathUtils.checkFileName(newName, true);
        filePath = resolve(filePath);
        const newPath = join(dirname(filePath), newName);
        await rename(filePath, newPath);
        OutputHandler.showResult('renaming completed');
      } catch (error) {
        OutputHandler.showOperationError(error);
      }
      OutputHandler.showCurrentDir();
    };

    addFile = async (fileName) => {
      try {
        FilePathUtils.checkFileName(fileName, true);
        const filePath = join(cwd(), fileName);
        const fileHandle = await open(filePath, 'wx');
        await fileHandle.close();
      } catch (error) {
        OutputHandler.showOperationError(error);
      }
      OutputHandler.showCurrentDir();
    }

    removeFile = async (filePath) => {
      filePath = resolve(filePath);// join(cwd(), fileName);
      try {
        await rm(filePath);
        OutputHandler.showOperationError('file deleted');
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
