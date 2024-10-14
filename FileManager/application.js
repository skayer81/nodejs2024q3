import * as readline from 'node:readline/promises';
import {
    stdin as input,
    stdout as output,
} from 'node:process';
import { Greeting } from "./greeting/greeting.js";
import { OSInfo } from './OSInfo/OSInfo.js';
import { HASHCalculator } from './HASHCalculator/HASHCalculator.js';
import { EventEmitter } from './eventEmitter/eventEmitter.js';
import { Navigation } from './navigation/navigation.js';
import { ListOutput } from './listOutput/listOutput.js';
import { FileSystems } from './fileSystems/fileSystems.js';
import { Compressor } from './compressor/compressor.js';


class Application{

    #eventEmitter = new EventEmitter();

    constructor(){
        this.rl = readline.createInterface({ input, output });
        new ListOutput();
        new HASHCalculator();
        new Navigation();
        new OSInfo();
        new FileSystems();  
        new Compressor()   ;   
        this.rl.on('line', (input) =>  {
            const line = input.trim().split(" ");
            this.#eventEmitter.emit(line.shift().trim(), [line.join(' ').trim()] )
        })
    }
}

const application = new Application()




