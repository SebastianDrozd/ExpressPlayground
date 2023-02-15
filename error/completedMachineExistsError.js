class CompletedMachineExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CompletedMachineExistsError';
    this.message = "A machine with that name and id  already exists";
    this.statusCode = 409;
  }
}

module.exports = CompletedMachineExistsError;