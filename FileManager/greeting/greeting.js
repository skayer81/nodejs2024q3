
export class Greeting{

    #userName = 'Anonymous';
    #defaultUserNameKey = 'npm_config_username';
    #greetingText = 'Welcome to the File Manager';
    #PartingTextBefore = 'Thank you for using File Manager';
    #PartingTextAfter = 'goodbye'

    constructor(rl){
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
        this.#outputGreeting();
        rl.on('SIGINT', () => {
            this.#outputParting();
        });


    }
    #outputGreeting(){
        console.log(`${this.#greetingText}, ${this.#userName}`)
    }
    #outputParting(){
        console.log(`${this.#PartingTextBefore}, ${this.#userName}, ${this.#PartingTextAfter}`)
      //  Thank you for using File Manager, Username, goodbye!
    }
}

// console.log("start")
// const argPrefix = '--';
// const result = [];


//console.log(result.join())
//console.log(process.env.npm_config_username)

//readline

//Попробуй получать имя пользователя из process.env.npm_config_username, если не найдено, то из process.argv