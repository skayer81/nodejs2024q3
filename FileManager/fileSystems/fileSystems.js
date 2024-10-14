import { createHash } from 'crypto';
import { createReadStream, createWriteStream } from 'fs';
//import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { dirname, basename } from 'path';
import { chdir, cwd } from 'node:process';
import { EventEmitter } from '../eventEmitter/eventEmitter.js';
import { resolve, join } from 'node:path';
//import  fs  from 'node:fs/promises';
import {rename, rm, open} from 'node:fs/promises';

import { FilePathUtils } from '../filePathUtils/filePathUtils.js';
import { OutputHandler } from '../outputHandler/outputHandler.js';


export class FileSystems{

    #messages = {
      isFileDel : 'file deleted',
      isFileCreate : 'file created',
      outputFileStart : 'file reading start',
      outputFileEnd : 'file reading completed',
    }

    // #commands = {
    //     cat: 'cat',
    //     add: 'add',
    //     rn: 'rn',
    //     cp: 'cp',
    //     mv: 'mv',
    //     rm: 'rm',
    //     'up': this.upDir,
    //     'cd': this.changeDir,
    //     // 'homedir': this.outputHomedir,
    //     // 'username' : this.outputUsername,
    //     // 'architecture': this.outputArchitecture
    // }
    #eventEmitter=  new EventEmitter()
//     Создать пустой файл в текущем рабочем каталоге:
// add new_file_name

    constructor(){
     //   this.#eventEmitter.on(this.#eventEmitter.events.up, this.upDir);

      //  this.#eventEmitter.on(this.#eventEmitter.events.up, this.changeDir);
//       Удалить файл:
// rm path_to_file
// rn path_to_file new_filename
//cat path_to_file
//cp path_to_file path_to_new_directory
//mv path_to_file path_to_new_directory
        this.#eventEmitter.on(this.#eventEmitter.events.add, this.addFile)
        this.#eventEmitter.on(this.#eventEmitter.events.rm, this.removeFile)
        this.#eventEmitter.on(this.#eventEmitter.events.rn, this.renameFile)
        this.#eventEmitter.on(this.#eventEmitter.events.cat, this.outputFile)
        this.#eventEmitter.on(this.#eventEmitter.events.cp, this.copyFile)
        this.#eventEmitter.on(this.#eventEmitter.events.mv, this.moveFile)
    }

    // addFile(){

    // }

    // rn "filemanager\test .  txt"   test2.txt

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
    
            writeStream.on('finish', () => OutputHandler.showResult(`copying completed`));    
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
          let [filePath, newName] = FilePathUtils.getPaths(paths)
          FilePathUtils.checkFileName(newName, true);
          filePath = resolve(filePath);
          const newPath = join(dirname(filePath), newName)
          await rename(filePath, newPath)
          OutputHandler.showResult('renaming completed')
        } catch (error) {
            OutputHandler.showOperationError(error)
        } 
          OutputHandler.showCurrentDir();
        
    };


    addFile = async (fileName) => {
        try{
          FilePathUtils.checkFileName(fileName, true)
           const filePath = join(cwd(), fileName);
           const fileHandle = await open(filePath, 'wx'); 
           await fileHandle.close();
        }
        catch(error){
          OutputHandler.showOperationError(error)
        }
        OutputHandler.showCurrentDir();
    }

    
    removeFile = async (filePath) => {
        filePath = resolve(filePath);// join(cwd(), fileName);
        //import fs from 'fs/promises';

try {
	await rm(filePath);
    OutputHandler.showOperationError('file deleted')
	//console.log('file deleted');
} catch (error) {
    OutputHandler.showOperationError(error)
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
                OutputHandler.showResult(`copying completed`)
                this.removeFile(filePath);
            });    
            writeStream.on('error', (error) => OutputHandler.showOperationError(error));
            writeStream.on('close', () => OutputHandler.showCurrentDir());
    
        } catch (error) {
            OutputHandler.showOperationError(error);
        }
       
    }

    
    //  executeСommand = (filePath) => {
    //     const currentCommand = 'hash'; //String(currentCommand).trim().slice(this.#prefix.length).toLowerCase();
    //   //  console.log(this.#commands[currentCommand])
    //     this.#commands[currentCommand].call(this, filePath)
    //  }

    //  upDir(){
    //     console.log(`Запуск каталога: ${cwd()}`);
    //     console.log(`обрез`, dirname(cwd()))
    //     try {
    //         chdir(dirname(cwd()));
    //     console.log(`Новый каталог: ${cwd()}`);
    //    } catch (err) {
    //       console.error(`chdir: ${err}`);
    //  }
    // }

    // changeDir(path){
    //     console.log(`Запуск каталога: ${cwd()}`);
    //     console.log(`путь`, path)
    //     try {
    //         chdir(path);
    //     console.log(`Новый каталог: ${cwd()}`);
    //    } catch (err) {
    //       console.error(`chdir: ${err}`);
    //  }
    // }


     
    //   async calculateHash(filePath) {
    //     console.log(filePath)

    //      const fileName =  filePath//'fileToCalculateHashFor.txt';
    //     // const dir = join(dirname(fileURLToPath(import.meta.url)), 'files');
    //      const hash = createHash('sha256');
    //     // const fileStream = createReadStream(join(dir, fileName));
    //     const fileStream = createReadStream(fileName);
    //     fileStream
    //     .on('data', (chunk) => {
    //         hash.update(chunk);
    //     })
    //     .on('end', () => {
    //        process.stdout.write(`HASH: ${hash.digest('hex')}`)
    //     })
    // };

 
 }
 