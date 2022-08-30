const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: "*",
  methods: "*",
});
const PORT = process.env.PORT || 5000;
require("./Connection");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

server.listen(PORT, () => {
  console.log("server running at port", PORT);
});

app.set("socketio", io);
