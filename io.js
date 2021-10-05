const express = require('express')
const http = require("http")
const socketIo = require("socket.io")
const CONFIG = require('./config')
const socketPort = CONFIG.WEBSOCKET_PORT || 8081
const app = express()
const server = http.createServer(app);

server.listen(socketPort, () => console.log(`Listening on port ${socketPort}`))

const io = socketIo(server, {
  cors: {
    origin: CONFIG.APP_CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

let userSockects = {}

io.on("connection", (socket) => {
  console.log("Client connected")
  let query = socket.handshake.query ? socket.handshake.query : {}

  if (query.token) {
    userSockects[query.token.replace(/"/g, '')] = socket
  }
  socket.on("disconnect", () => {
    Object.keys(userSockects).forEach((key) => {
      if (userSockects[key].id == socket.id) {
        delete userSockects[key]
      }
    })
  })
})

module.exports = userSockects