const User = require("../models/User");
const { generateToken } = require('../utils/generateToken')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const Token = require('../models/Token')
const mailTransport = require('../config/mail')
const jwt = require('jsonwebtoken')



exports.registerUser = async (req, res, next) => {
    const { name, email, password, phone, role } = req.body
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return next({
              status: 400,
              message: 'Validation Error',
              errors: errors.array().map(error=>error.msg)
          })
    }
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const newUser = new User({ 
        name,
        email,
        phone, 
        password: hashedPassword,
        role,
      });

      if(newUser)
      {
        const token = generateToken(newUser._id, "24h")
        await newUser.save();
        await Token.create({ token, user: newUser._id });
        return res
        .status(201)
        .json({ 
          message: "User registered successfully", 
          user: {
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
            status: newUser.status,
            favoriteHotels: newUser.favoriteHotels
          }, 
          token });
      }
    } catch (error) {
        return next(error);
  }
};


exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
      return next({
        status: 400,
        message: "Validation Error",
        errors: errors.array().map(error=>error.msg)
      })
    }
    const user = await User.findOne({ email });
    if(!user)
    {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }


    if (user.status == 'blocked') {
      return res.status(400).json({ message: "user blocked" });
    }

    const token = generateToken(user._id, "24h")
    await Token.create({ token, user: user._id });

    return res.status(200).json({
       user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        favoriteHotels: user.favoriteHotels
       }, 
       token  });
  } catch (error) {
    return next(error)
  }
};

exports.googleAuth = async(req, res, next)=>{
  const { role, phone } = req.body

  try{
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
      return next({
        status: 400,
        message: "Validation Error",
        errors: errors.array().map(error=>error.msg)
      })
    }
    const user = req.user
    user.role = role
    user.phone = phone
    await user.save()
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: role,
        phone: phone
      },
      token: req.headers.authorization?.split(' ')[1]
    })

  }catch(error)
  {
    return next(error)
  }
}



exports.logoutUser = async (req, res) =>{
    try{
        const token = req.headers.authorization?.split(' ')[1]
        if(token)
        {
            const result = await Token.deleteOne({ token });
            if (result.deletedCount > 0) {
              return res.status(200).json({ message: "Logged out successfully" });
            }
          return res.status(401).json({ message: "Token not found" });
        }else {
          return res.status(401).json({ message: "Token is required" });
      }
    }catch(error)
    {
        console.log("error in logout", error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

exports.forgotPassword = async(req, res, next)=>{
    const {email} = req.body
    try{
      const errors = validationResult(req)
      if(!errors.isEmpty())
      {
        return next({
          status: 400,
          message: "Validation Error",
          errors: errors.array().map(error=>error.msg)
        })
      }
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(404).json({message: "User not found"})
        }

        const resetToken = generateToken(user._id, "15m")

        const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        const transporter = await mailTransport()
        
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. The link expires in 15 minutes.</p>`
        })
        return res.status(200).json({message: "Password reset link sent to email"})

    }catch(error)
    {
        return next(error)
    }
}



exports.resetPassword = async(req, res, next)=>{
    const { token, newPassword } = req.body;

    try{
      const errors = validationResult(req)
      if(!errors.isEmpty())
      {
          return next({
            status: 400,
            message: "Validation Error",
            errors: errors.array().map(error=>error.msg)
          })
      }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId);

        if(!user)
        {
            return res.status(404).json({message: "User not found"})
        }
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save()
        res.status(200).json({message: "Password reset succufully"})
    }catch (error) {
        if (error.name === "TokenExpiredError") {
          res.status(400).json({ errors: "Token expired" });
        } else {
          res.status(400).json({ errors: "Invalid token", error: error.message });
        }
      }
}


exports.sendVerifyLink = async (req, res)=>{
  const { email } = req.body
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
      return next({
        status: 400,
        message: "Validation Error",
        errors: errors.array().map(error=>error.msg)
      })
    }
    const user = await User.findOne({email})
    if(!user)
    {
      return res.status(404).json({message: "User not found"})
    }
    const verifyToken = generateToken(user._id, "15m")
    const verifyLink = `${process.env.CLIENT_URL}/verify-email/${verifyToken}`
    const transporter = await mailTransport()
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Verify Email",
      html: `<p>Click <a href="${verifyLink}">here</a> to verify email</p>`
    })
    return res.status(200).json({message: "Verify link send succufully"})
  }catch(error)
  {
    res.status(500).json({message: "Internal server error"})
  }
}

exports.verifyEmail = async(req, res)=>{
  const {token} = req.body
  try{
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
      return next({
        status: 400,
        message: "Validation Error",
        errors: errors.array().map(error=>error.msg)
      })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.userId)
    if(!user)
    {
      return res.status(404).json({message: "User not found"})
    }
    user.verify = true
    await user.save()
    return res.status(200).json({message: "your email verify succufully"})
  }catch(error)
  {
    res.status(500).json({message: "Internal server error"})
  }
}








