class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.type = 'UserNotFoundError';
    this.statusCode = 404;
  }
}
module.exports = UserNotFoundError;