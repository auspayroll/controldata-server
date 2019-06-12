const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    //next()
    //return 
    try{
        
        token = req.headers.authorization.split(' ')[1]
        console.log('token ' + token)
        const decoded = jwt.verify(token, process.env.JWT)
        console.log(decoded)
        req.user_id = decoded._id
        next()
    } catch (error){
        console.log(error)
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
} 