import { dirname } from 'path';
import { chdir, cwd } from 'node:process';
import { EventEmitter } from '../eventEmitter/eventEmitter.js';
import { OutputHandler } from '../outputHandler/outputHandler.js';

export class Navigation {
    #eventEmitter= new EventEmitter()

    constructor() {
      this.#eventEmitter.on(this.#eventEmitter.events.up, this.upDir);
      this.#eventEmitter.on(this.#eventEmitter.events.cd, this.changeDir);
    }

     upDir =() => {
       this.changeDir(dirname(cwd()));
     }

    changeDir = (path) => {
      try {
        chdir(path);
      } catch (error) {
        OutputHandler.showOperationError(error);
      }
      OutputHandler.showCurrentDir();
    }
}