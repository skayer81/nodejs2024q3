import { normalize, basename, resolve } from 'path';
import { OutputHandler } from '../outputHandler/outputHandler.js';

export class FilePathUtils {
  static checkPathIsEmpty(path, isFile = false) {
    if (!path || typeof path !== 'string') {
      OutputHandler.showInputError(`${isFile ? 'file name' : 'path'} cannot be empty`);
      throw new Error();
    }
  }

  static checkFileName(fileName) {
    let result = false;
    this.checkPathIsEmpty(fileName, true);
    const normalized = normalize(fileName);
    result = (normalized === basename(normalized));
    if (!result) {
      OutputHandler.showInputError(`"${fileName}" is not name of file`);
      throw new Error();
    }
  }

  static getResolvePath(path) {
    if (path[0] === '"' && path[path.length - 1] === '"') {
      return resolve(String(path).slice(1, -1));
    }
    return resolve(path);
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