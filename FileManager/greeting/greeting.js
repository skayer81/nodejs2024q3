
export class Greeting{

    #userName = 'Anonymous';
    #defaultUserNameKey = 'npm_config_username';
    #greetingText = 'Welcome to the File Manager';

    constructor(){
        const name = process.env[this.#defaultUserNameKey];
        if (name){
            this.#userName = name ;
        }
        else{
            for (let i = 0; i < process.argv.length; i++ ){
               
                const item = process.argv[i];
            //    console.log(item)
                // if (item.startsWith(argPrefix) && process.argv[i+1]){
                //         result.push(`${item} is ${process.argv[i+1]} `)
                //         i++;
                //     } 
            }

        }
        //console.log(this.#userName);
        this.#outputGreeting()

    }
    #outputGreeting(){
        console.log(`${this.#greetingText}, ${this.#userName}`)
    }
}

// console.log("start")
// const argPrefix = '--';
// const result = [];


//console.log(result.join())
//console.log(process.env.npm_config_username)

//readline

//Попробуй получать имя пользователя из process.env.npm_config_username, если не найдено, то из process.argv