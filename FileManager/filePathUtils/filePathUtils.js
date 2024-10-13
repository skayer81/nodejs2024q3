import path from 'path';

//console.log(path.dirname('./толб/ввц/dir/file.txt'));
//console.log(path.dirname('file.txt'));

export class FilePathUtils{

    static isFileName(fileName){
            if (!fileName || typeof fileName !== 'string') {
                return false;
            }
            const normalized = path.normalize(fileName);
            return normalized === path.basename(normalized);
        }
    

    static  getPaths(input) {
        const paths = [];
        let currentPath = '';
        let inQuotes = false;
    
        for (let char of input) {
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