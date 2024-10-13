import os from 'os'
import { EventEmitter } from '../eventEmitter/eventEmitter.js';

export class OSInfo{

    #prefix = '--';
    #errorText = 'the key for the "os" command is incorrect'
    #commands = {
        'eol': this.outputEOL,
        'cpus': this.outputCpus,
        'homedir': this.outputHomedir,
        'username' : this.outputUsername,
        'architecture': this.outputArchitecture
    }
    #eventEmitter = new EventEmitter()

    constructor(){
        this.#eventEmitter.on(this.#eventEmitter.events.os, this.executeСommand)
    }
    
     executeСommand = (currentCommand) => {
        currentCommand = String(currentCommand).trim().slice(this.#prefix.length).toLowerCase();
        try{
         this.#commands[currentCommand]()
        }
        catch{
          console.error(this.#errorText)
        }       
     }
     
     outputEOL ()  {
        console.log(`EOL: ${JSON.stringify(os.EOL)}`)
     }

     outputCpus () {
        const MHzInGHz = 1000
        const cpusInfo = os.cpus().map((item) => {
            return { model: item.model, speed: `${item.speed/MHzInGHz} GHz`}
       })       
       console.table(cpusInfo)       
       console.log(`total cpus: ${os.cpus().length}` )
     }

     outputHomedir () {
        console.log(`Homedir: ${os.homedir()}`)
     }
     
     outputUsername ()  {
        console.log(`Username: ${os.userInfo().username}`)
     }
     
     outputArchitecture()  {
        console.log(`Architecture: ${os.arch()}`)
     }
 }
 