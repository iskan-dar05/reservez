const Book = require("../models/Books");
const Notification = require("../models/Notification");
const { io, getSocketIdByUserId } = requrie('../utils/socket')
const mailTransport = require('../config/mail')

exports.createBook = async (req, res) => {
    try {
      const userId = req.user.id; // Extract user ID from auth middleware
      const { hotelId, roomId, startDate, endDate } = req.body;
  
      if (!hotelId || !startDate || !endDate) {
        return res.status(400).json({ message: "Hotel, start date, and end date are required." });
      }
  
      const book = new Book({
        user: userId, // Associate booking with the user
        hotel: hotelId,
        room: roomId || "any", // If no room is provided, default to "any"
        startDate,
        endDate,
      });
      
      await book.save();

      const hotel = await Hotel.findById(hotelId)

      const owner = await User.findById(hotel.ownerId)
      const socketId = getSocketIdByUserId(hotel.ownerId)

      await Notification.create({
        userId: hotel.ownerId,
        message: "you have new customer " + req.user.name
      });

      const transporter = await mailTransporter()

      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: owner.email,
        subject: "New Reservation",
        html: `
            <h2>New Booking Confirmation</h2>
            <p><strong>Customer Name:</strong> ${req.user.name}</p>
            <p><strong>Customer Email:</strong> ${req.user.email}</p>
            <p><strong>Check-in Date:</strong> ${book.startDate}</p>
            <p><strong>Check-out Date:</strong> ${book.endDate}</p>
            <hr>
            <p>Please confirm the booking as soon as possible.</p>
        `,

      })

      if(socketId)
      {
        io.to(socketId).emit("newNotify", book)
      }
  
      return res.status(201).json({ message: "Booking created successfully", book });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  
  exports.confirmBook = async (req, res) => {
    try {
      //const userId = req.user.id; // Extract user ID from auth middleware
      const { id } = req.body; // Booking ID from request body
  
      const book = await Book.findOne({ _id: id }); // Check if the booking belongs to the user
      if (!book) {
        return res.status(404).json({ message: "Booking not found or unauthorized." });
      }
  
      if (book.status !== "pending") {
        return res.status(400).json({ message: "Only pending bookings can be confirmed." });
      }
      const customer = await User.findById(book.user)
      const hotel = await Hotel.findById(book.hotel)
      book.status = "confirmed";
      await book.save();

      const transporter = await mailTransport()
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: customer.email,
        subject: "Your Reservation Has Been Confirmed",
        html: `
            <h2>Reservation Confirmation</h2>
            <p>Dear ${customer.name},</p>
            <p>We are pleased to confirm your reservation at our hotel ${hotel.name}. Here are your booking details:</p>
            <p><strong>Check-in Date:</strong> ${book.startDate}</p>
            <p><strong>Check-out Date:</strong> ${book.endDate}</p>
            <hr>
            <p>If you have any questions or need further assistance, feel free to contact us.</p>
            <p>Thank you for choosing our hotel. We look forward to welcoming you!</p>
        `,
      })
  
      return res.status(200).json({ message: "Booking confirmed successfully", book });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  
  exports.cancelBook = async (req, res) => {
    try {
      const userId = req.user.id; // Extract user ID from auth middleware
      const { id } = req.body; // Booking ID from request body
  
      const book = await Book.findOne({ _id: id }); // Ensure the booking belongs to the user
      if (!book) {
        return res.status(404).json({ message: "Booking not found or unauthorized." });
      }
  
      if (book.status === "cancelled") {
        return res.status(400).json({ message: "Booking is already cancelled." });
      }
      const customer = await User.findById(book.user)
      const hotel = await Hotel.findById(book.hotel)
      book.status = "cancelled";
      await book.save();

      const transporter = await mailTransport()
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: customer.email,
        subject: "Your Reservation Has Been Confirmed",
        html: `
            <h2>Reservation Cancled</h2>
            <p>Dear ${customer.name},</p>
            <p>We are pleased to confirm your reservation at our hotel ${hotel.name}. Here are your booking details:</p>
            <p><strong>Check-in Date:</strong> ${book.startDate}</p>
            <p><strong>Check-out Date:</strong> ${book.endDate}</p>
            <hr>
            <p>If you have any questions or need further assistance, feel free to contact us.</p>
            <p>Thank you for choosing our hotel. We look forward to welcoming you!</p>
        `,
      })
  
      return res.status(200).json({ message: "Booking cancelled successfully", book });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

  exports.getBooksByHotelId = async (req, res) => {
    try {
      const hotelId = req.params.hotelId;
  
      // Find all books with the specified hotelId
      const books = await Book.find({ hotel: hotelId })
        .populate("hotel", "name location") // Populate hotel details
        .populate("room", "roomType price") // Populate room details
        .populate("user", "name email") // Populate user details
        .sort({ createdAt: -1 }); // Sort by creation date (latest first)
  
      if (!books.length) {
        return res.status(404).json({ message: "No bookings found for this hotel." });
      }
  
      return res.status(200).json({ message: "Bookings for this hotel retrieved successfully", books });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  