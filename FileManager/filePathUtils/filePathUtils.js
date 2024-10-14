import { normalize, basename } from 'path';
import { OutputHandler } from '../outputHandler/outputHandler.js';

export class FilePathUtils {

  static checkFileName(fileName) {
    let result = false
    if (!fileName || typeof fileName !== 'string') {
      //return false;
      //throw new Error(`"${fileName}" is not name of file`)
      OutputHandler.showInputError('file name cannot be empty')
      throw new Error()
    }
    const normalized = normalize(fileName);
    result = (normalized === basename(normalized));
    if (!result){
        OutputHandler.showInputError(`"${fileName}" is not name of file`)
        throw new Error()
      //  throw new Error(`"${fileName}" is not name of file`)
    }
   // return result;
  }

  static getPaths(input) {
    const paths = [];
    let currentPath = '';
    let inQuotes = false;

    for (const char of input) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ' ' && !inQuotes) {
        if (currentPath) {
          paths.push(currentPath.trim());
          currentPath = '';
        }
      } else {
        currentPath += char;
      }
    }
    if (currentPath) {
      paths.push(currentPath.trim());
    }
    return paths;
  }
}