import { createHash } from 'crypto';
import { createReadStream } from 'fs';
//import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { chdir, cwd } from 'node:process';
import { EventEmitter } from '../eventEmitter/eventEmitter.js';


export class Navigation{

    #commands = {
        'up': this.upDir,
        'cd': this.changeDir,
        // 'homedir': this.outputHomedir,
        // 'username' : this.outputUsername,
        // 'architecture': this.outputArchitecture
    }
    #eventEmitter=  new EventEmitter()

    constructor(){
        this.#eventEmitter.on(this.#eventEmitter.events.up, this.upDir);
        this.#eventEmitter.on(this.#eventEmitter.events.cd, this.changeDir)
    }

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
 