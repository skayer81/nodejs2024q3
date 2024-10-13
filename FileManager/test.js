import path from 'path';

console.log(path.dirname('./толб/ввц/dir/file.txt'));
console.log(path.dirname('file.txt'));

const message = 'mko,l'

console.error(`\x1b[32m${message}\x1b[0m`);
console.log('\x1b[31mЭто красный текст\x1b[0m');
console.log('\x1b[32mЭто зеленый текст\x1b[0m');
console.log('\x1b[34mЭто синий текст\x1b[0m');