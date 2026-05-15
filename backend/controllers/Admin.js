const User = require('../models/User')
const Hotel = require('../models/Hotel')
const Books = require('../models/Books')
const Token = require('../models/Token')
const Chat = require('../models/Chat')
const mailTransport = require('../config/mail')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils/generateToken')
const { validationResult } = require('express-validator')
const { getSocketIdByUserId } = require("../utils/socket")


exports.loginUser = async(req, res, next)=>{
    const { email, password } = req.body;
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next({
                status: 400,
                message: 'Validation Error',
                errors: errors.array().map(error=>error.msg)
            })
      }
        const user = await User.findOne({email})
        if(!user)
        {
              return res.status(400).json({ message: "Invalid credentials" });
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if(user.role !== 'admin')
        {
            return res.status(400).json({ message: "dont have permission" });
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
    }catch(error)
    {
        return next(error);
    }
}



exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } });
    const transformedUsers = users.map((user)=>({
      id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      phone: user.phone,
      role: user.role,
      status: user.status
    }))
    res.status(200).json({
        users: transformedUsers
      });
  } catch (error) {
    return next(error)
  }
};

exports.getAllBooks = async (req, res) => {
    try {
      const books = await Books.find()
        .populate("hotel", "name location") // Populate hotel details
        .populate("room", "roomType price") // Populate room details
        .populate("user", "name email") // Populate user details
        .sort({ createdAt: -1 }); // Sort by creation date (latest first)
  
      if (!books.length) {
        return res.status(404).json({ message: "No bookings found." });
      }
  
      return res.status(200).json({ message: "All bookings retrieved successfully", books });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };


exports.deleteUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next({
            status: 400,
            message: 'Validation Error',
            errors: errors.array().map(error=>error.msg)
        })
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next({
        status: 400,
        message: "User Not Found"
      })
    }
    if(user.role === 'owner')
    {
      const hotels = await Hotel.deleteMany({ ownerId: user._id })
    }
    const transporter = await mailTransport()
        
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Admin Deleted Your Account",
            html: `Your Account is Deleted`
        })
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return next(error)
  }
};



exports.blockUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next({
            status: 400,
            message: 'Validation Error',
            errors: errors.array().map(error=>error.msg)
        })
    }
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return next({
        status: 400,
        message: "User Not Found"
      })
    }

    user.status = "blocked"; // Assuming you have an `isBlocked` field in the User schema
    await user.save();
    const transporter = await mailTransport()
        
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Blocked Your Account",
            html: `Your Account is Blocked`
        })
    const socketId = getSocketIdByUserId(user._id)
    if(socketId)
    {
      io.to(socketId).emit("blockEvent", "you are blocked")
    } 
    return res.status(200).json({ message: "User blocked successfully", user });
  } catch (error) {
    return next(error)
  }
};


exports.activateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next({
            status: 400,
            message: 'Validation Error',
            errors: errors.array().map(error=>error.msg)
        })
    }
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "active";  // Assuming you have an `isBlocked` field in the User schema
    await user.save();
    const transporter = await mailTransport()
        
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Activated Your Account",
            html: `Your Account is Activated`
        })
    return res.status(200).json({ message: "User activated successfully", user });
  } catch (error) {
    return next(error)
  }
};


exports.searchUser = async (req, res, next)=>{
	const { name, role, id } = req.query
	const filters = []
	try{
		if(name)
		{
			filters.name = { $regex: name, $options: "i" }
		}
		if(role)
		{
			filters.role = { $regex: role, $options: "i" }
		}
		if(id)
		{
			filters.id = { $regex: id, $options: "i" }
		}
		const users = await User.find(filters);
		return res.status(200).json(users);
	}catch(error)
	{
		
	}
}








