const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Replace with your User model path
const Token = require('../models/Token')

const authMiddleware = (role = null)=>{
  return async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token ) {
      return next({
        status: 401,
        message: "Unauthorized: No token provided"
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || !await Token.findOne({ token })) {
      return next({
        status: 401,
        message: "Unauthorized Please Sign in or Sign up"
      })
    }
    req.user = user;
   

    if(role && user.role !== role)
    {
      return next({
        status: 403,
        message: "Forbidden: Not access required"
      })
    }
    next();
  } catch (error) {
    return next(error)
  }
}};


module.exports = {authMiddleware};