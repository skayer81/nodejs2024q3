import * as readline from 'node:readline/promises';
import {
    stdin as input,
    stdout as output,
} from 'node:process';
import {homedir, cpus, userInfo} from 'node:os';

import { Greeting } from "../greeting/greeting.js";
import { OSInfo } from '../OSInfo/OSInfo.js';
import { HESHCalculator } from '../HESHCalculator/HESHCalculator.js';


class Application{



    constructor(){
        this.rl = readline.createInterface({ input, output });
        this.greeting = new Greeting(this.rl);
        this.OSInfo = new OSInfo();
        this.HESHCalculator = new HESHCalculator() //this.HESHCalculator()
        this.rl.on('line', (input) => {
            const modules = {
                'os': this.OSInfo.executeСommand,
                'hash': this.HESHCalculator.executeСommand
            } 
          //  console.log(`Received: ${input}`);
            const command = input.split(" ");
            console.log('ввели', command);
            modules[command[0]](command[1]);
        });
        console.log(homedir());
        console.log(userInfo())
    }


}

const application = new Application()




