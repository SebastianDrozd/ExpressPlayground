class CreatedCompletedMachineResponse {
    constructor(machine) {
        this.type = "CreatedCompletedMachineResponse";
        this.success = true;
        this.message = "Successfully created a new completed machine";
        this.statusCode= 201;
    }
}
module.exports = CreatedCompletedMachineResponse;