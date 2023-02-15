
class TokenResponse {
    constructor(token,id, points,email) {
        this.token = token;
        this.id = id;
        this.points = points;
        this.email = email
    }
}

module.exports = TokenResponse;