import { cwd } from 'node:process';
import { readdir } from 'node:fs/promises';
import { EventEmitter } from '../eventEmitter/eventEmitter.js';
import { OutputHandler } from '../outputHandler/outputHandler.js';


export class ListOutput{

    #eventEmitter=  new EventEmitter()

    constructor(){
        this.#eventEmitter.on(this.#eventEmitter.events.ls, this.#listOutput);
    }
    
    #getType = (item) => {
        if (item.isFile()) return "file";
        if (item.isDirectory()) return "directory";
      };
   
    #listOutput = async () => {   
        const filePath = cwd()
           readdir(filePath, { withFileTypes: true })
           .then((result) => {
             result =  result.map(item => ({
                  Name: item.name,
                  Type: this.#getType(item),
                })).filter( item => item.Type != undefined)
                .sort((a, b) => {
                   if (a.Type !== b.Type) return a.Type === 'file' ? 1 : -1;
                   return a.Name > b.Name
                })               
               console.table(result)
           }).catch((error) => {
                OutputHandler.showOperationError(error)
           }).finally(() => {
            OutputHandler.showCurrentDir();
           })
           ;
       };
   

 
 }
 