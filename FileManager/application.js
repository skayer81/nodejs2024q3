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


class Application{

    #eventEmitter = new EventEmitter();
    #OSInfo = new OSInfo();
    #HASHCalculator = new HASHCalculator() 

    constructor(){
        this.rl = readline.createInterface({ input, output });
     //   this.greeting = new Greeting(this.rl);
      //  this.OSInfo = new OSInfo();
    //    this.HASHCalculator = new HASHCalculator() 
        this.rl.on('line', (input) => {
        //     const modules = {
        //         'os': this.OSInfo.executeСommand,
        //         'hash': this.HASHCalculator.executeСommand
        //     } 
        //   //  console.log(`Received: ${input}`);
            const command = input.split(" ");
            console.log('ввели', command);
            this.#eventEmitter.emit(command[0], [command[1]] )
           // modules[command[0]](command[1]);
        });
        console.log(homedir());
        console.log(userInfo())
    }


}

const application = new Application()




