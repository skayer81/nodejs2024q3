import os from 'os';
import { EventEmitter } from '../eventEmitter/eventEmitter.js';
import { OutputHandler } from '../outputHandler/outputHandler.js';

export class OSInfo {
    #prefix = '--';
    #errorText = 'the key for the "os" command is incorrect';
    #outputStartMessage = {
        EOL: 'EOL:',
        cpus: 'total cpus:',
        homedir: 'Homedir:',
        username: 'Username:',
        architecture: 'Architecture:'
    };

    #commands = {
        eol: () => this.outputResult('EOL', JSON.stringify(os.EOL)),
        cpus: () => this.outputCpus(),
        homedir: () => this.outputResult('homedir', os.homedir()),
        username: () => this.outputResult('username', os.userInfo().username),
        architecture: () => this.outputResult('architecture', os.arch())
    };

    #eventEmitter = new EventEmitter();

    constructor() {
        this.#eventEmitter.on(this.#eventEmitter.events.os, this.executeCommand);
    }

    executeCommand = (currentCommand) => {
        currentCommand = String(currentCommand).trim().slice(this.#prefix.length).toLowerCase();
        const command = this.#commands[currentCommand];

        if (command) {
            command();
        } else {
            OutputHandler.showInputError(this.#errorText);
        }

        OutputHandler.showCurrentDir();
    };

    outputResult(key, value) {
        OutputHandler.showResult(`${this.#outputStartMessage[key]} ${value}`);
    }

    outputCpus() {
        const MHzInGHz = 1000;
        const cpusInfo = os.cpus().map(({ model, speed }) => ({
            model,
            speed: `${speed / MHzInGHz} GHz`
        }));

        console.table(cpusInfo);
        OutputHandler.showResult(`${this.#outputStartMessage.cpus} ${os.cpus().length}`);
    }
}