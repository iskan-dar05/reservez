const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const passport = require('passport')
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  sendVerifyLink,
  verifyEmail,
  googleAuth,
} = require("../controllers/Auth");
const {authMiddleware} = require("../middlewares/Auth.middleware")


require('../config/passport');

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );


router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
      if (!req.user) {
        return res.status(400).json({ error: 'Authentication failed.' });
      }
      if(req.user.redirectUrl)
      {
        return res.redirect(req.user.redirectUrl);
      }
      const { user, token } = req.user;
      const redirectUrl = `${process.env.FRONTEND_URL}?userId=${user._id}&token=${token}&email=${user.email}&name=${user.name}&role=${user.role}&phone=${user.phone}`
      res.redirect(redirectUrl)
        
     
    }
  );



router.post("/register", [
  body('name')
    .exists().withMessage('name is required')
    .isString()
    .isAlpha().withMessage('Name must only contain alphabet characters')
    .isLength({ min: 1 }).withMessage('Name cannot be empty')
    .trim()
    .escape(),
  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape(),
  body('password')
    .exists()
    .withMessage("password is required")
    .isLength({ min:6 }),
  body('phone')
    .exists()
    .withMessage("phone number is required")
    .trim()
    .escape(),
  body('role')
    .exists().withMessage('Role is required')
    .isIn(['admin', 'customer', 'owner']).withMessage("Invalid role")
    .trim()
    .escape(),

], registerUser);

router.post("/login", [
  body('email')
    .exists().withMessage('Email is required')
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape(),
  body('password')
    .exists()
    .withMessage("password is required")
    .isLength({ min:6 }),
], loginUser);

router.post("/logout", authMiddleware(), logoutUser)

router.post("/forgot-password", [
  body('email')
    .exists().withMessage('Email is required')
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape()
], forgotPassword);

router.post("/reset-password", [
  body('token')
    .exists().withMessage('Token is required')
    .isString(),
  body('newPassword')
    .exists()
    .withMessage("password is required")
    .isLength({ min:6 }),
], resetPassword);

router.post('/send-verify-link', [
  body('email')
    .exists().withMessage('Email is required')
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape()
], sendVerifyLink);

router.post('/verify-email', [
  body('token')
    .exists().withMessage('Token is required')
    .isString()
], verifyEmail);

router.post('/google-auth', [
  body('phone')
    .exists()
    .withMessage("phone number is required")
    .isMobilePhone("ar-DZ", { strictMode: false })
    .withMessage("Invalid phone number format")
    .trim()
    .escape(),
  body('role')
    .exists().withMessage('Role is required')
    .isIn(['admin', 'customer', 'owner']).withMessage("Invalid role")
    .trim()
    .escape(),
],authMiddleware(), googleAuth)

module.exports = router

