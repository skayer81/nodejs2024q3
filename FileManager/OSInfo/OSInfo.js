import os from 'os'
import { EventEmitter } from '../eventEmitter/eventEmitter.js';
import { OutputHandler } from '../outputHandler/outputHandler.js';

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
    #outputStartMessage = {
      EOL: 'EOL:',
      cpus: 'total cpus:',
      homedir: 'Homedir:',
      username: 'Username:',
      architecture: 'Architecture:'
    }

    #eventEmitter = new EventEmitter()

    constructor(){
        this.#eventEmitter.on(this.#eventEmitter.events.os, this.executeСommand)
    }
    
     executeСommand = (currentCommand) => {
        currentCommand = String(currentCommand).trim().slice(this.#prefix.length).toLowerCase();
        try{
         this.#commands[currentCommand].call(this)
        }
        catch (error){
          OutputHandler.showInputError(this.#errorText)
        }
        OutputHandler.showCurrentDir();       
     }
     
     outputEOL ()  {
        OutputHandler.showResult(`${this.#outputStartMessage.EOL} ${JSON.stringify(os.EOL)}`)
     }

     outputCpus () {
        const MHzInGHz = 1000
        const cpusInfo = os.cpus().map((item) => {
            return { model: item.model, speed: `${item.speed/MHzInGHz} GHz`}
       })       
       console.table(cpusInfo)   
       OutputHandler.showResult(`${this.#outputStartMessage.cpus} ${os.cpus().length}`)    
     }

     outputHomedir () {
      OutputHandler.showResult(`${this.#outputStartMessage.homedir} ${os.homedir()}`) 
     }
     
     outputUsername ()  {
      OutputHandler.showResult(`${this.#outputStartMessage.username} ${os.userInfo().username}`) 
     }
     
     outputArchitecture()  {      
       OutputHandler.showResult(`${this.#outputStartMessage.architecture} ${os.arch()}`) 
     }
 }
 