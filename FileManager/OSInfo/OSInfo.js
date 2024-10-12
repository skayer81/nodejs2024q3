import os from 'os'

export class OSInfo{

    #prefix = '--';
    #commands = {
        'eol': this.outputEOL,
        'cpus': this.outputCpus,
        'homedir': this.outputHomedir,
        'username' : this.outputUsername,
        'architecture': this.outputArchitecture
    }
    
     executeСommand = (currentCommand) => {
        currentCommand = String(currentCommand).trim().slice(this.#prefix.length).toLowerCase();
        this.#commands[currentCommand]()
     }
     
     outputEOL ()  {
        console.log(`EOL: ${JSON.stringify(os.EOL)}`)
     }

     outputCpus () {
        const MHzInGHz = 1000
        const cpusInfo = os.cpus().map((item) => {
            return { model: item.model, speed: `${item.speed/MHzInGHz} GHz`}
       })       
       console.table(cpusInfo)       
       console.log(`total cpus: ${os.cpus().length}` )
     }

     outputHomedir () {
        console.log(`Homedir: ${os.homedir()}`)
     }
     
     outputUsername ()  {
        const { username } = os.userInfo();
        console.log(`Username: ${username}`)
     }
     
     outputArchitecture()  {
        console.log(`Architecture: ${os.arch()}`)
     }
 }
 