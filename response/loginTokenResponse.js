
class TokenResponse {
    constructor(token,id, points) {
        this.token = token;
        this.id = id;
        this.points = points;
        this.statusCode = 200;
    }
}

module.exports = TokenResponse;