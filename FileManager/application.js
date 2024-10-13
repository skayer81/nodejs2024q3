import * as readline from 'node:readline/promises';
import {
    stdin as input,
    stdout as output,
} from 'node:process';
import {homedir, cpus, userInfo} from 'node:os';

import { Greeting } from "./greeting/greeting.js";
import { OSInfo } from './OSInfo/OSInfo.js';
import { HASHCalculator } from './HASHCalculator/HASHCalculator.js';
import { EventEmitter } from './eventEmitter/eventEmitter.js';
import { Navigation } from './navigation/navigation.js';
import { ListOutput } from './listOutput/listOutput.js';


class Application{

    #eventEmitter = new EventEmitter();
    // #OSInfo = new OSInfo();
    // #HASHCalculator = new HASHCalculator() 
    // #navigation = new Navigation()
   // #ListOutput = new ListOutput()

    constructor(){
        new ListOutput();
        new HASHCalculator();
        new Navigation();
        new OSInfo();
        this.rl = readline.createInterface({ input, output });
        this.rl.on('line', (input) => {
            const line = input.trim().split(" ");
            this.#eventEmitter.emit(line.shift().trim(), [line.join('')] )
        });
    }
}

const application = new Application()




