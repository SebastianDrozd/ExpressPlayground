const bcrypt = require("bcrypt")
 const hashPassword = (text) => bcrypt.hash(text, 10, function(err, hash) {
    if (err) throw err;
    return hash
    }
    );
module.export= {hashPassword}