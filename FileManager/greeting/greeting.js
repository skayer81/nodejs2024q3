import { EventEmitter } from "../eventEmitter/eventEmitter.js";
import { OutputHandler } from "../outputHandler/outputHandler.js";

export class Greeting{

    #defaultUserName = 'Anonymous';
    #userNpmNameKey = 'npm_config_username';
    #userArgvNameKey = '--username'
    #greetingText = 'Welcome to the File Manager';
    #PartingTextBefore = 'Thank you for using File Manager';
    #PartingTextAfter = 'goodbye';
    #userName = '';
    #description = `description File Manager:`;
    #part1 = `1: use double quotes if the command requires two paths and your paths have spaces \n    eg (cp "path with spaces" "another path with spaces")`;
    #part2 = `2: if the command requires only 1 path and it contains spaces, using double quotes is not necessary \n    eg (add path with spaces) or (add "path with spaces"))`
    #part3 = `3: you can use single quotes in the file name, like in Windows \n    eg (add 't'e's't'.txt)`;
    #part4 = `4: 'path_to_destination' in 'compress' and 'decompress' is the path to the new file (folder + filename) \n    proof: https://discord.com/channels/755676888680366081/1293278834375786517/1294785422353891401`;


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
        console.log(this.#description);
        console.log(this.#part1);
        console.log(this.#part2);
        console.log(this.#part3);
        console.log(this.#part4);
        OutputHandler.showCurrentDir()
    }
    #outputParting() {
         OutputHandler.showResult(`${this.#PartingTextBefore}, ${this.#userName}, ${this.#PartingTextAfter}`)
    }
}