const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }, // Added to store the name of the user
  comment: { type: String, required: true },
  rating: { type: Number, required: false, min: 1, max: 5 },
  date: { type: Date, default: Date.now },
});


const roomSchema = new mongoose.Schema({
  roomType: { type: String, required: true },
  advantages: { type: [String], required: true }, // Array of advantages for the room
  price: { type: Number, required: true },
  image: [
    {
      type: String,
      required: true
    }
  ],
  availability: { type: Boolean, default: true },
});


const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description:{
      type: String,
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [
      {
        type: String, // URLs or paths to the hotel images
        required: true,
      },
    ],
    location: {
        type: String,

      },
    map: {
      type: String,
      required: true
    },
    rooms: [roomSchema],
    comments: [commentSchema],
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

hotelSchema.pre("save", function (next) {
  if (this.comments.length > 0) {
    const totalRatings = this.comments.reduce(
      (sum, comment) => sum + comment.rating,
      0
    );
    this.averageRating = totalRatings / this.comments.length;
    this.totalReviews = this.comments.length;
  } else {
    this.averageRating = 0;
    this.totalReviews = 0;
  }
  next();
});

module.exports = mongoose.model("Hotel", hotelSchema);
