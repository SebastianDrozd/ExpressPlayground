class DbError extends Error {
  constructor(message) {
    super(message);
    this.type = 'DbError';
    this.statusCode = 500;
  }
}
module.exports = DbError;