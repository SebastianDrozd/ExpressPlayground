class TokenInvalidError extends Error {
  constructor(message) {
    super(message);
    this.type = 'TokenInvalidError';
    this.statusCode = 401;
  }
}
module.exports = TokenInvalidError;