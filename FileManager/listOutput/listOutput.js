import { cwd } from 'node:process';
import { readdir } from 'node:fs/promises';
import { EventEmitter } from '../eventEmitter/eventEmitter.js';
import { OutputHandler } from '../outputHandler/outputHandler.js';

export class ListOutput {
    #eventEmitter = new EventEmitter();

    constructor() {
      this.#eventEmitter.on(this.#eventEmitter.events.ls, this.#listOutput.bind(this));
    }

    #getType(item) {
      if (item.isFile()) return 'file';
      if (item.isDirectory()) return 'directory';
      return '';
    }

    async #listOutput() {
      const filePath = cwd();

      try {
        const result = await readdir(filePath, { withFileTypes: true });
        const formattedResult = result
          .map((item) => ({
            Name: item.name,
            Type: this.#getType(item),
          }))
          .filter((item) => item.Type !== '')
          .sort((a, b) => {
            if (a.Type !== b.Type) return a.Type === 'file' ? 1 : -1;
            return a.Name.localeCompare(b.Name);
          });
          
        OutputHandler.showTable(formattedResult);
      } catch (error) {
        OutputHandler.showOperationError(error);
      } finally {
        OutputHandler.showCurrentDir();
      }
    }
}
