const express = require('express');
const router = express.Router();
const { body } = require('express-validator') 
const {getAllChats , sendMessage , createChat} = require('../controllers/Chat');
const { authMiddleware } = require('../middlewares/Auth.middleware')

// Middleware to authenticate user (if needed)

// Route to create a new chat room
router.post('/create', authMiddleware(), createChat);

// Route to send a message
router.post('/send', authMiddleware(), sendMessage);

// Route to get all chats for a user
router.get('/all', authMiddleware(), getAllChats);

module.exports = router;