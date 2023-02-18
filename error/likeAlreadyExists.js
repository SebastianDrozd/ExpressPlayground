class LikeAlreadyExists extends Error {
  constructor(message) {
    super(message);
    this.name = 'LikeAlreadyExists';
    this.statusCode = 409;
  }
}
module.exports = LikeAlreadyExists;