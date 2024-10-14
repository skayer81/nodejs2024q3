import { EventEmitter } from "../eventEmitter/eventEmitter.js";
import { OutputHandler } from "../outputHandler/outputHandler.js";

export class Greeting{

    #defaultUserName = 'Anonymous';
    #userNpmNameKey = 'npm_config_username';
    #userArgvNameKey = '--username'
    #greetingText = 'Welcome to the File Manager';
    #PartingTextBefore = 'Thank you for using File Manager';
    #PartingTextAfter = 'goodbye';
    #userName = ''

    #eventEmitter = new EventEmitter()

    constructor(rl){
        this.rl = rl
        this.#userName = this.#getUserName()
        this.#outputGreeting();

        this.rl.on('SIGINT', () => {
            this.#applicationExit();
        });

        this.#eventEmitter.on(this.#eventEmitter.events[".exit"], this.#applicationExit)
    }

    #getUserName(){
        let  name = process.env[this.#userNpmNameKey];
        if (name){
            return name
        }
        name = process.argv.find(item => item.startsWith(`${this.#userArgvNameKey}=`))?.split('=')[1];
        return  name ? name : this.#defaultUserName;
    }

    #applicationExit = () => {
        this.#outputParting();
        this.rl.close();
    }

    #outputGreeting(){
        OutputHandler.showResult(`${this.#greetingText}, ${this.#userName}`)
        OutputHandler.showCurrentDir()
    }
    #outputParting() {
         OutputHandler.showResult(`${this.#PartingTextBefore}, ${this.#userName}, ${this.#PartingTextAfter}`)
    }
}