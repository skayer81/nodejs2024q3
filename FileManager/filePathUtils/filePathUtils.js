import { normalize, basename } from 'path';

export class FilePathUtils {
  static isFileName(fileName) {
    if (!fileName || typeof fileName !== 'string') {
      return false;
    }
    const normalized = normalize(fileName);
    return normalized === basename(normalized);
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