import { createHash } from 'crypto';
import { createReadStream } from 'fs';
//import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { chdir, cwd } from 'node:process';
import { EventEmitter } from '../eventEmitter/eventEmitter.js';
import { resolve, join } from 'node:path';
import  fs  from 'node:fs/promises';


export class FileSystems{

    #commands = {
        cat: 'cat',
        add: 'add',
        rn: 'rn',
        cp: 'cp',
        mv: 'mv',
        rm: 'rm',
        'up': this.upDir,
        'cd': this.changeDir,
        // 'homedir': this.outputHomedir,
        // 'username' : this.outputUsername,
        // 'architecture': this.outputArchitecture
    }
    #eventEmitter=  new EventEmitter()
//     Создать пустой файл в текущем рабочем каталоге:
// add new_file_name

    constructor(){
     //   this.#eventEmitter.on(this.#eventEmitter.events.up, this.upDir);

      //  this.#eventEmitter.on(this.#eventEmitter.events.up, this.changeDir);
//       Удалить файл:
// rm path_to_file
        this.#eventEmitter.on(this.#eventEmitter.events.add, this.addFile)
        this.#eventEmitter.on(this.#eventEmitter.events.rm, this.removeFile)
    }

    // addFile(){

    // }

    addFile = async (fileName) => {
        const filePath = join(cwd(), fileName);
    //    const filePath = join(path, 'src','fs', 'files','fresh.txtc');
    
        try {
            const fileHandle = await fs.open(filePath, 'wx'); 
           // await fileHandle.writeFile('I am fresh and young')
            await fileHandle.close(); 
        } catch (err) {//code: 'EPERM',
            if (err.code === 'EEXIST') {
                console.error('the file already exists');
            } 
            if (err.code === 'EPERM'){
                console.error('operation not permitted');
            }
            else {
                console.error(err.message);
            }
        }
    }

    
    removeFile = async (fileName) => {
        const filePath = join(cwd(), fileName);
        //import fs from 'fs/promises';

try {
	await fs.rm(filePath);
	console.log('file deleted');
} catch (err) {
    if (err.code === 'ENOENT'){
        console.error('no such file')
    }
    if (err.code === 'ERR_FS_EISDIR'){
        console.error('is a directory')
    }
    // code: 'EISDIR',
    // message: 'is a directory',
    else {
	console.log(err);
    }
}
// [Error: ENOENT: no such file or directory, lstat 'D:\NodeJS2024q3\FileManager\nodejs2024q3\filePath'] {
//     errno: -4058,
//     code: 'ENOENT',
        // unlink(filePath)
        //  .then()
        //  .catch((err) => {
        //     if (err.code === 'ENOENT') {
        //         console.error('FS operation failed');
        //     } else {
        //         console.error(err);
        //     }
        // })
    };

    //path.isAbsolute(path)
//     import { chdir, cwd } from 'node:process';

// console.log(`Запуск каталога: ${cwd()}`);
// try {
//     chdir('/tmp');
//     console.log(`Новый каталог: ${cwd()}`);
// } catch (err) {
//     console.error(`chdir: ${err}`);
//}
    
     executeСommand = (filePath) => {
        const currentCommand = 'hash'; //String(currentCommand).trim().slice(this.#prefix.length).toLowerCase();
      //  console.log(this.#commands[currentCommand])
        this.#commands[currentCommand].call(this, filePath)
     }

     upDir(){
        console.log(`Запуск каталога: ${cwd()}`);
        console.log(`обрез`, dirname(cwd()))
        try {
            chdir(dirname(cwd()));
        console.log(`Новый каталог: ${cwd()}`);
       } catch (err) {
          console.error(`chdir: ${err}`);
     }
    }

    changeDir(path){
        console.log(`Запуск каталога: ${cwd()}`);
        console.log(`путь`, path)
        try {
            chdir(path);
        console.log(`Новый каталог: ${cwd()}`);
       } catch (err) {
          console.error(`chdir: ${err}`);
     }
    }


     
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
 