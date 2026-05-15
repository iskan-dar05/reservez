const User = require("../models/User");
const { validationResult } = require('express-validator')
const fs = require('fs')
const Hotel = require('../models/Hotel')
const mailTransport = require('../config/mail')
const { io, getSocketIdByUserId } = require('../utils/socket')

exports.updateUser = async (req, res, next) => {
  const { name, phone } = req.body;
  try {
    const user = await User.findById(req.params.id);
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        fs.unlinkSync(user.image)
        return next({
            status: 400,
            message: 'Validation Error',
            errors: errors.array().map(error=>error.msg)
        })
    }
    if (!user) {
      return next({
        status: 400,
        message: "User Not Found"
      })
    }

    if (name) {
      user.name = name;
    }
    if(phone)
    {
      user.phone = phone
    }
    if(req.file)
    {
      user.image = req.file.path
      
    }

    await user.save();
    return res.status(200).json(
      { 
        message: "Profile updated",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          image: user.image,
          status: user.status,
          favoriteHotels: user.favoriteHotels
         }
      }
    );
  } catch (error) {
    return next(error)
  }
};


exports.addFavHotel = async(req, res, next)=>{
    try{
      const errors = validationResult(req)
      if(!errors.isEmpty())
      {
        return next({
          status: 400,
          message: 'Validation Error',
          errors: errors.array().map(error=>error.msg)
      })
      }

      const hotel = await Hotel.findById(req.params.id)
      if(!hotel)
      {
        return next({
          status: 400,
          message: "Hotel Not Found"
        })
      }
      req.user.favoriteHotels.push(hotel._id)
      return res.status(201).json({
          message: "Hotel Saved",
          user: {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            phone: req.user.phone,
            role: req.user.role,
            image: req.user.image,
            status: req.user.status,
            favoriteHotels: req.user.favoriteHotels
           }
      })

    }catch(error){
     return next(error)
    }
}

exports.deleteFavHotel = async(req, res, next)=>{
  const { index } = req.body
  try{
    const errors = validationResult(req)
      if(!errors.isEmpty())
      {
        return next({
          status: 400,
          message: 'Validation Error',
          errors: errors.array().map(error=>error.msg)
      })
      }
    req.user.favoriteHotels.splice(index, 1)
    req.user.save()
    return res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        image: user.image,
        status: user.status,
        favoriteHotels: user.favoriteHotels
      }
    })
  }catch(error)
  {
    return next(error)
  }
}


exports.getUserById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next({
            status: 400,
            message: 'Validation Error',
            errors: errors.array().map(error=>error.msg)
        })
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return next({
        status: 400,
        message: "User Not Found"
      })
    }
    res.status(200).json(user);
  } catch (error) {
    return next(error)
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
    await req.user.deleteOne();

    const transporter = await mailTransport()
        
        transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Deleted Your Account",
            html: `Your Account is Deleted`
        })
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return next(error)
  }
};


