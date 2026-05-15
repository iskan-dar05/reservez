const jwt = require("jsonwebtoken");

exports.generateToken = (userId, timeEx)=>{
    const payload = {userId, jti: `${userId}-${Date.now()}`}
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: timeEx }
    );
    return token
}







