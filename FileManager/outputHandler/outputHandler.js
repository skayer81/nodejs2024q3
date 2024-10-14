import { table } from 'node:console';
import { cwd } from 'node:process';
export class OutputHandler{

    static errorMessages = {
        'EEXIST': 'the file already exists',
        'EPERM' : 'operation not permitted',
        'ENOENT' : 'no such file or directory',
        'ERR_FS_EISDIR' : 'is a directory',
        'Z_BUF_ERROR' : 'unexpected end of file'
    }

    static showOperationError = (error) => {
        const prefixText = 'Operation failed'
        let message = this.errorMessages[error.code] ?? error.message;
        if (message) {
            console.error(`\x1b[31m${prefixText}: ${message}\x1b[0m`);
        }

        }

    static showInputError = (message) => {
            const prefixText = 'Invalid input'
            console.error(`\x1b[31m${prefixText}: ${message}\x1b[0m`);
    }           
    

    static showResult = (message) => {
        console.log(`\x1b[32m${message}\x1b[0m`);
    }

    static showFileText = (message) => {
        console.log(`\x1b[33m${message}\x1b[0m`);
    }

    static showCurrentDir = () => {
        const prefixText = 'You are currently in';
        console.log(`\x1b[34m${prefixText} ${cwd()}\x1b[0m`);
    }

    static showTable = (data) => {
        console.table(data)
    }



} 
