class PasswordMismatchError extends Error {
    constructor(message) {
        super(message);
        this.type = 'PasswordMismatchError';
        this.statusCode = 401;
    }   
}
module.exports = PasswordMismatchError;