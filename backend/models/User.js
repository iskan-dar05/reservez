const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  googleId: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  image: {type: String, required: false},
  phone: { type: String, required: false },
  role: { type: String, enum: ["customer", "owner", "admin"] }, // User roles
  verify: { type: Boolean, default: false },
  status: { type: String, enum: ["active", "blocked"], default: "active" }, // Status field
  favoriteHotels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hotel" }], // Customer's favorite hotels
});

module.exports = mongoose.model("User", userSchema);
