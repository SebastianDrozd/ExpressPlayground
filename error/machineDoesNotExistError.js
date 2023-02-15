class MachineDoesNotExistError extends Error{
    constructor(message){
        super(message);
        this.name = 'MachineDoesNotExistError';
        this.message = "A machine with that name and id does not exist";
        this.statusCode = 404;
    }
}
module.exports = MachineDoesNotExistError;