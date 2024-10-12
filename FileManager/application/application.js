import * as readline from 'node:readline/promises';
import {
    stdin as input,
    stdout as output,
} from 'node:process';

import { Greeting } from "../greeting/greeting.js";

class Application{
 

    constructor(){
        this.rl = readline.createInterface({ input, output });
        this.greeting = new Greeting(this.rl);
    }
}

const application = new Application()


