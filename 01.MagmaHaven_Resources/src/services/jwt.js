const jwt = require('jsonwebtoken');


function createToken(userData) {
    const payload = {
        //check identity
        email: userData.email,
        username:userData.username,
        _id: userData._id
    };

    const token = jwt.sign(payload, 'itASecret', {
        expiresIn: '1d'
    });

    return token;

}

function verifyToken(token) {
    const data = jwt.verify(token, 'itASecret');

    return data;
}

module.exports = {
    createToken,
    verifyToken
};