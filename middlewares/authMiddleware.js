const {verifyToken} = require ('../helpers/jwt')
// const {generateToken} = require ('../helpers/jwt')

const authMiddleware=(req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1]

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    const decodedToken = verifyToken(token)

    if (!decodedToken){
        return res.status(401).json({message:"invalid token"})
    }
    req.user = {
        userId: decodedToken.userId,
        role: decodedToken.role
    }
    next()
    
}
module.exports = authMiddleware