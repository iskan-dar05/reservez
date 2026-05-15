const express = require("express");
const { body, check } = require('express-validator')
const router = express.Router();
const {
    createHotel,
    getAllHotels,
    getHotelById,
    updateHotel,
    deleteHotel,
    addComment,
    getComments,
    addRoom,
    deleteRoom,
    getHotelsByOwner,
    searchHotels,
    updateRoom,
    suggestionHotels
  } = require("../controllers/Hotels");

const upload = require('../config/multerConfig');


const {authMiddleware} = require('../middlewares/Auth.middleware')


router.post("/", upload.array('images', 5), [
  body('name')
      .exists().withMessage('name is required')
      .isString()
      .isAlpha().withMessage('name must only contain alphabet characters')
      .isLength({ min: 1 }).withMessage('name cannot be empty')
      .trim()
      .escape(),
  body('location')
      .exists().withMessage('location is required')
      .isLength({ min: 1 }).withMessage('Name cannot be empty'),
  body('map')
      .exists().withMessage('Map is required'),
  body("description")
      .exists().withMessage("description is required")
], authMiddleware("owner"), createHotel);

router.get("/", authMiddleware(), getAllHotels);

router.get("/suggestion", authMiddleware(), suggestionHotels)

router.get("/owner", authMiddleware(), getHotelsByOwner);

router.put("/:id", upload.array('images', 5), [
    
    check('id').isMongoId().withMessage('ID must be a number'),
    body('name')
      .optional()
      .isString()
      .isAlpha().withMessage('Name must only contain alphabet characters')
      .isLength({ min: 1 }).withMessage('Name cannot be empty')
      .trim()
      .escape(),
    body('description')
      .optional()
      .isString()
      .trim(),
    body('indexes')
      .optional()
      .custom(value => {
        if (!Array.isArray(value)) {
          throw new Error('Indexes must be an array');
        }
        if (!value.every(item => Number.isInteger(item))) {
          throw new Error('Each item in indexes must be an integer');
        }
        return true;
      })
], authMiddleware('owner'),updateHotel);

router.get("/search", searchHotels);

router.get("/:id", [
    check('id').isMongoId().withMessage('ID must be a number')
], getHotelById);

router.delete("/:id", [
    check('id').isMongoId().withMessage('ID must be number')
], authMiddleware(), deleteHotel);



router.post("/:id/comments", [
    check('id').isMongoId().withMessage('ID must be number')
], authMiddleware(), addComment);

router.get("/:id/comments", [
    check('id').isMongoId().withMessage('ID must be number')
], authMiddleware(), getComments);



router.post("/:id/rooms",   upload.array('images'), [
    check('id').isMongoId().withMessage('ID must be number'),
    body('roomType')
        .exists().withMessage('roomType is required')
        .isString()
], authMiddleware("owner"), addRoom);

router.put("/:id/rooms/:roomId", authMiddleware("owner"), upload.array('images'), updateRoom);

router.delete("/:id/rooms/:roomId", [
    check('id').isMongoId().withMessage('ID must be number'),
    check('roomId').isMongoId().withMessage('roomId must be number')
], deleteRoom);




module.exports = router;
