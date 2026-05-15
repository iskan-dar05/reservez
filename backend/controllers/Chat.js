const { io, getSocketIdByUserId } = require('../utils/socket')
const Chat = require('../models/Chat')
const User = require('../models/User')





exports.createChat = async(req, res)=>{
    try{
        const { ownerId } = req.body    
        const chatRoom = await Chat.find({ customer: customer, owner: owner })
        console.log(chatRoom)
        if(chatRoom.length !== 0   )
        {
            return res.status(400).json({"message": "chat room alredy exists"})
        }
        const owner = await User.findById(ownerId)
        const newChatRoom = new Chat({
            customerId: req.user._id,
            ownerId: owner._id,
            customerName: req.user.name,
            ownerName: owner.name
        })
        await  newChatRoom.save()
        const socketId = getSocketIdByUserId(owner)
        if(socketId)
        {
            io.to(socketId).emit("newChat", newChatRoom)
        }
        res.status(201).json({"message" : "chat room created"})
    }catch(error)
    {
        return res.status(500).json({ message: "Server error", error: error.message });

    }
}







exports.sendMessage = async (req, res)=>{
    try{
        const { message, receiverId, chatId } = req.body
        const newMessage = {  
            senderId: req.user._id,
            receiverId: receiverId,
            content: message
        }
        
        const chat = await Chat.findById(chatId)

        if(!chat)
        {
            return res.status(404).json({message: "chat not found"})
        }

        chat.messages.push(newMessage)
        await  chat.save()
        const socketId = getSocketIdByUserId(receiverId)
        if(socketId)
        {
            io.to(socketId).emit("newMessage", newMessage)
        }
        return res.status(201).json({message: "message created success"})
    }catch(error)
    {
        return res.status(500).json({ message: "Server error", error: error.message });

    }
}

exports.getAllChats = async (req, res) => {
    try {
        const { userId } = req.body;

        // Fetch chats excluding messages
        const chats = await Chat.find(
            { $or: [{ customer: userId }, { owner: userId }] },
            { messages: 0 } // Exclude the messages field
        );

        return res.status(200).json({ chats });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


exports.getMessagesByChatId = async (req, res) => {
    try {
        const { chatId } = req.params;

        // Fetch messages for a specific chat ID
        const chat = await Chat.findById(chatId, { messages: 1 }); // Include only the messages field

        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }

        return res.status(200).json({ messages: chat.messages });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};