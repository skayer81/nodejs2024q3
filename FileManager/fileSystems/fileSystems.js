import { createHash } from 'crypto';
import { createReadStream } from 'fs';
//import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { chdir, cwd } from 'node:process';
import { EventEmitter } from '../eventEmitter/eventEmitter.js';
import { resolve, join } from 'node:path';
import  fs  from 'node:fs/promises';

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
        this.#eventEmitter.on(this.#eventEmitter.events.add, this.addFile)
        this.#eventEmitter.on(this.#eventEmitter.events.rm, this.removeFile)
        this.#eventEmitter.on(this.#eventEmitter.events.rn, this.renameFile)
        this.#eventEmitter.on(this.#eventEmitter.events.cat, this.outputFile)
    }

    // addFile(){

    // }

    // rn "filemanager\test .  txt"   test2.txt

    outputFile = async (path) => {
      //  const messageStart = 'file reading start';
      //  const messageEnd = 'file reading completed';
        path = resolve(path);
        OutputHandler.showResult(this.#messages.outputFileStart)
      //  console.log(`\x1b[32m${messageStart}\n\x1b[0m`);
      //  try{
           // await access(path, constants.F_OK)
        const stream = createReadStream(path);
        stream.on('data', (chank) => {
               // process.stdout.write(chank)
               OutputHandler.showFileText(chank)
          //     console.log(`\x1b[32m${chank}\n\x1b[0m`);
            }); 
        stream.on('end', () => {
                //     process.stdout.write(`HASH: ${hash.digest('hex')}\n`)
                    // console.log(`\x1b[32m${messageEnd}\n\x1b[0m`);
                     OutputHandler.showResult(this.#messages.outputFileEnd)
                  })
        stream.on('error', (error) => {
            ErrorHandler.showError(error)
        })

      //  }
        // catch(error){
        //     console.log('ошибка')
        //     console.log(error)
        // }
    }

    renameFile = async (paths) => {
        let [filePath, newName] = FilePathUtils.getPaths(paths)
        filePath = resolve(filePath);
        console.log(filePath);
      //  const filePath = join(dirname(fileURLToPath(import.meta.url)), 'files', 'wrongFilename.txt')
     //   const newPath = join(dirname(fileURLToPath(import.meta.url)), 'files', 'properFilename.md')
    
        try {            
           if (!FilePathUtils.isFileName(newName)){
                  throw new Error(`"${newName}" is not name of file`)
           }  
            await access(filePath, constants.F_OK)
            await _rename(filePath, newPath)
        } catch (error) {
            console.log(error);
            ErrorHandler.showError(error)
            // if (err.code === 'ENOENT') {
            //     console.error('FS operation failed');
            // } else {
            //     console.log('err.code', err.code)
            //     console.error(err);
            // }
        } 
    };


    addFile = async (fileName) => {
        try{
          if (!FilePathUtils.isFileName(fileName)){
            throw new Error(`"${fileName}" is not name of file`)
         }
           const filePath = join(cwd(), fileName);
           const fileHandle = await fs.open(filePath, 'wx'); 
           await fileHandle.close();
        }
        catch(error){
          ErrorHandler.showError(error)
        }
    }

    
    removeFile = async (filePath) => {
        filePath = resolve(filePath);// join(cwd(), fileName);
        //import fs from 'fs/promises';

try {
	await fs.rm(filePath);
    OutputHandler.showOperationError('file deleted')
	//console.log('file deleted');
} catch (error) {
    OutputHandler.showOperationError(error)
}

    };

    
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
 