const jwt = require('jsonwebtoken');
const secret='mysecret';
function createToken(){
    payload:{

    }
    const token=json.sign(payload,secret);
    return token
}

function validateToken(token){
    jwt.verify(token,secret)

}

module.exports={
    createToken,
    validateToken
}