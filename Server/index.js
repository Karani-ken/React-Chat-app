const express = require('express')
const app = express()
const http = require('http');
const cors = require("cors");
const {Server} = require("socket.io")

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin:"http://localhost:5173",
        methods:["GET","POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id}`)

     socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`user with ID: ${socket.id} joined room: ${data}`)
     });
     
    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`)
    })
})

server.listen(3001, () => {
    console.log("server started on port 3001")
})