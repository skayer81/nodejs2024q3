// исправить удаление, если файл не перенесся
//исправить d:
//испрравить ПР
import * as readline from 'node:readline/promises';
import {
    stdin as input,
    stdout as output,
} from 'node:process';
import { chdir } from 'node:process';
import { Greeting } from "./greeting/greeting.js";
import { OSInfo } from './OSInfo/OSInfo.js';
import { HASHCalculator } from './HASHCalculator/HASHCalculator.js';
import { EventEmitter } from './eventEmitter/eventEmitter.js';
import { Navigation } from './navigation/navigation.js';
import { ListOutput } from './listOutput/listOutput.js';
import { FileSystems } from './fileSystems/fileSystems.js';
import { Compressor } from './compressor/compressor.js';
import { OutputHandler } from './outputHandler/outputHandler.js';
import { homedir } from 'node:os';


class Application{

    #eventEmitter = new EventEmitter();
    #errorText = 'command does not exist';

    constructor(){
        chdir(homedir())
        this.rl = readline.createInterface({ input, output });
        new Greeting(this.rl)
        new ListOutput();
        new HASHCalculator();
        new Navigation();
        new OSInfo();
        new FileSystems();  
        new Compressor()   ;   
        this.rl.on('line', (input) =>  {
            const line = input.trim().split(" ");
            const command = line.shift().trim()
            if (this.#eventEmitter.events[command]) {
                this.#eventEmitter.emit(command, [line.join(' ').trim()] )
                return
            }
            OutputHandler.showInputError(this.#errorText)
            
        })
    }
}

const application = new Application()




