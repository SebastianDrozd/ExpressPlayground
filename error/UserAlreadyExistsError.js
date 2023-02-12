class UserAlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.type = 'UserAlreadyExistsError';
    this.statusCode = 409;
  }
}
module.exports = UserAlreadyExistsError