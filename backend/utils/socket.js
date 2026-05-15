const { Server } = require('socket.io')
const http = require('http')
const express = require('express')


const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173']
    }
})

// used to store online users

const userSocketMap = {}; // {userId: socketId}

const getSocketIdByUserId = (userId)=>{
    return userSocketMap[userId]
}

io.on("connection", (socket)=>{
    console.log("a user connected ", socket.id)
    const userId = socket.handshake.query.userId;
    if(userId)
    {
        userSocketMap[userId] = socket.id
    }
    socket.on("disconnect", ()=>{
        console.log("A user disconnect", socket.id)
        delete userSocketMap[userId]
    })
})


module.exports = {io, app, server, getSocketIdByUserId}





