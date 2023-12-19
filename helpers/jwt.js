const jwt = require('jsonwebtoken')


const verifyToken = (token)=>{
    try {
        const decoded =  jwt.verify(token, 'secretkey')
        return decoded
    } catch (error) {
        return null
    }
}
const generateToken=(userId, role)=>{
    const payload ={userId, role}
    const secretKey= 'secretkey'

    return jwt.sign(payload, secretKey)
}


module.exports={ generateToken, verifyToken}