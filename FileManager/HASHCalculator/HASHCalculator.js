import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


export class HASHCalculator{

    #commands = {
        'hash': this.calculateHash,
        // 'cpus': this.outputCpus,
        // 'homedir': this.outputHomedir,
        // 'username' : this.outputUsername,
        // 'architecture': this.outputArchitecture
    }
    
     executeСommand = (filePath) => {
        const currentCommand = 'hash'; //String(currentCommand).trim().slice(this.#prefix.length).toLowerCase();
      //  console.log(this.#commands[currentCommand])
        this.#commands[currentCommand].call(this, filePath)
     }
     
      async calculateHash(filePath) {
        console.log(filePath)

         const fileName =  filePath//'fileToCalculateHashFor.txt';
        // const dir = join(dirname(fileURLToPath(import.meta.url)), 'files');
         const hash = createHash('sha256');
        // const fileStream = createReadStream(join(dir, fileName));
        const fileStream = createReadStream(fileName);
        fileStream
        .on('data', (chunk) => {
            hash.update(chunk);
        })
        .on('end', () => {
           process.stdout.write(`HASH: ${hash.digest('hex')}`)
        })
    };

 
 }
 