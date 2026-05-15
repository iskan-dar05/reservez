const express = require("express");
const router = express.Router();
const {
  createBook,
  confirmBook,
  cancelBook,
  getBooksByHotelId,
} = require("../controllers/Books");

const { authMiddleware } = require("../middlewares/Auth.middleware");

// Route to create a new booking
router.post("/", authMiddleware('customer'), createBook);

// Route to confirm a booking (only if it's in "pending" status)
router.put("/confirm", authMiddleware('owner'), confirmBook);

// Route to cancel a booking (only if it's not already cancelled)
router.put("/cancel", authMiddleware('owner'), cancelBook);


// Route to get bookings for a specific hotel by hotel ID
router.get("/hotel/:hotelId", authMiddleware('owner'), getBooksByHotelId);

module.exports = router;