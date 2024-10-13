import { createHash } from 'crypto';
import { createReadStream } from 'fs';
//import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { chdir, cwd } from 'node:process';
import fsPromises from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";


import { readdir, stat } from 'node:fs/promises';
import { resolve, extname , join} from 'node:path';
import { type } from 'os';
import {homedir, cpus, userInfo} from 'node:os';

const getType = (item) => {
     if (item.isFile()) return "file";
     if (item.isDirectory()) return "directory";
   };

const listOutput = async () => {

     const filePath = homedir()
        readdir(filePath, { withFileTypes: true })
        .then((result) => {
          result =  result.map(item => ({
               Name: item.name,
               Type: getType(item),
             })).filter( item => item.Type != undefined)
             .sort((a, b) => {
                if (a.Type !== b.Type) return a.Type === 'file' ? 1 : -1;
                return a.Name > b.Name
             })
            
            console.table(result)
        }).catch((err) => {
            if (err.code === 'ENOENT') {
                console.error('FS operation failed');
            } else {
                console.error(err);
            }
        })
        ;
    };

