import { createReadStream, createWriteStream } from 'fs';
import { dirname, basename } from 'path';
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
      isFileRename: 'file renamed',
      isFileCopy: 'file copied',
      isFileMove: 'file moved',
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

    #handleStream = async (filePath, newDir, message) => {
      try {
        const writeStream = createWriteStream(resolve(newDir, basename(filePath)));
        const readStream = createReadStream(filePath);

        readStream.pipe(writeStream);
        readStream.on('error', (error) => OutputHandler.showOperationError(error));

        writeStream.on('finish', () => OutputHandler.showResult(message));
        writeStream.on('error', (error) => OutputHandler.showOperationError(error));
        writeStream.on('close', () => OutputHandler.showCurrentDir());
      } catch (error) {
        OutputHandler.showOperationError(error);
      }
    }

    copyFile = async (paths) => {
      try {
        let [filePath, newDir] = FilePathUtils.getPaths(paths);
        FilePathUtils.checkPathIsEmpty(filePath, true);
        FilePathUtils.checkPathIsEmpty(newDir);
        filePath = resolve(filePath);
        newDir = resolve(newDir);
        await this.#handleStream(filePath, newDir, this.#messages.isFileCopy);
      } catch (error) {
        OutputHandler.showOperationError(error);
      }
    };

    outputFile = async (path) => {
      try {
        FilePathUtils.checkPathIsEmpty(path, true);
        path = FilePathUtils.getResolvePath(path);
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
        FilePathUtils.checkFileName(newName);
        filePath = resolve(filePath);
        const newPath = join(dirname(filePath), newName);
        await rename(filePath, newPath);
        OutputHandler.showResult(this.#messages.rename);
      } catch (error) {
        OutputHandler.showOperationError(error);
      }
      OutputHandler.showCurrentDir();
    };

    addFile = async (fileName) => {
      try {
        FilePathUtils.checkFileName(fileName);
        const filePath = FilePathUtils.getResolvePath(fileName);
        const fileHandle = await open(filePath, 'wx');
        await fileHandle.close();
        OutputHandler.showResult(this.#messages.isFileCreate);
      } catch (error) {
        OutputHandler.showOperationError(error);
      }
      OutputHandler.showCurrentDir();
    }

    removeFile = async (filePath, message = this.#messages.isFileDel) => {
      try {
        FilePathUtils.checkPathIsEmpty(filePath, true);
        filePath = FilePathUtils.getResolvePath(filePath);
        await rm(filePath);
        OutputHandler.showResult(message);
      } catch (error) {
        OutputHandler.showOperationError(error);
      } finally {
        OutputHandler.showCurrentDir();
      }
    };

    moveFile = async (paths) => {
      try {
        let [filePath, newDir] = FilePathUtils.getPaths(paths);
        filePath = resolve(filePath);
        newDir = resolve(newDir);
        await this.#handleStream(filePath, newDir, '');
        await this.removeFile(filePath, this.#messages.isFileMove);
      } catch (error) {
        OutputHandler.showOperationError(error);
      }
    };
}