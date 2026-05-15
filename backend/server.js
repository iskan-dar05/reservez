require("dotenv").config(); // Load environment variables
const express = require("express");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const hotelRoutes = require("./routes/hotelRoutes")
const authRoutes = require('./routes/authRoutes')
const chatRoutes = require('./routes/chatRoutes')
const adminRoutes = require('./routes/adminRoutes');
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const { app, server } = require('./utils/socket')



const PORT = process.env.PORT || 5000;



// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('./uploads'))
app.use(cors())
// Sample route
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes);
app.use('/api/hotel', hotelRoutes);
app.use('/api/chat', chatRoutes)
app.use('/api/admin', adminRoutes)
app.use(errorHandler)


// Start the server
const startServer = async () => {
  try {
      // Connect to MongoDB
      await connectDB();
      console.log("Connected to MongoDB");
      // Start the server
      server.listen(PORT, () => {
          console.log(`Server running on http://localhost:${PORT}`);
      });
  } catch (error) {
      console.error("Error during initialization:", error);
      process.exit(1); // Exit the process with an error code
  }
};
startServer();
