export class ErrorHandler{
    static showError(error){
        if (error.code === 'EEXIST') {
               console.error('the file already exists');
            } 
        if (error.code === 'EPERM'){
                console.error('operation not permitted');
            }
        else {
                console.error(error.message);
        }
    }
}