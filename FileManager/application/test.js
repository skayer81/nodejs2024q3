import os from 'os'

//console.log(os.cpus())

// const cpusInfo = {
//     number: '',
//     model : '',
//     speed: ''
// }

const cpusInfo = os.cpus().map((item, index) => {
     return { model: item.model, speed: `${item.speed/1000} GHz`}
})

console.table(cpusInfo)

// console.table(os.cpus(), ['model', 'speed'])
console.log(`total cpus: ${os.cpus().length}` )