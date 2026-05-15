const express = require("express");
const { body, check } = require('express-validator')
const router = express.Router();
const {
  updateUser,
  getAllUsers,
  getUserById,
  addFavHotel,
  deleteFavHotel,
  deleteUser,
} = require("../controllers/User");
const {authMiddleware, checkOwnership } = require("../middlewares/Auth.middleware")
const upload = require('../config/multerConfig');


router.put("/:id", upload.single('image'), [
  body('name')
      .optional()
      .isString()
      .isAlpha().withMessage('Name must only contain alphabet characters')
      .isLength({ min: 1 }).withMessage('Name cannot be empty')
      .trim()
      .escape(),
  body('phone')
      .optional()
      .trim()
      .escape(),
], authMiddleware(), updateUser);


router.put('/add/hotel/:id', [
  check('id').isMongoId().withMessage('ID must be id'),
], authMiddleware(), addFavHotel)

router.put('/delete/hotel/:id', [
  body('index').exists().withMessage("Index For Hotel Delete is required")
    .isInt(),
  check('id').isMongoId().withMessage("ID for hotel is required")
], authMiddleware(), deleteFavHotel)


router.get("/:id", [
      check('id').isMongoId().withMessage('ID must be id'),
], authMiddleware('admin'), getUserById);

// router.delete("", authMiddleware(), deleteUser);



module.exports = router;
