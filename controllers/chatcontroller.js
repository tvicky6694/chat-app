const message = require("../models/messages");
const socketio = require('socket.io');
const User = require('../models/users');
const room = require('../models/roomdetail');

const getMessages = async (req, res) => {
    res.locals.room = req.query.id;
    res.locals.user = req.session.user_id;
    let messages = await message.find({user_id: req.session.user_id});
    res.render('chat',{msgData: messages});
}

const init = (server) => {
    const io = socketio(server);

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });

        socket.on('message', async (msg) => {
            // Save message to database (optional)
            console.log("chat message",msg);
            let msgData = new message({
                user_id: msg.user,
                room_id: msg.room,
                message: msg.message
            });
            await msgData.save();
            // Emit message to all clients
            io.emit('message', msg);   
        });

        socket.on('join', async (data) => {
            let roomData = new room({
                user_id: msg.user,
                room_id: msg.room
            });
            await roomData.save();
        })
    });
};

module.exports = {
    getMessages: getMessages,
    init:init
}