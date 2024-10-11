import { createServer } from "http";
import { Server } from "socket.io";

// Set up the HTTP server and Socket.io server
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "https://niilong.vercel.app/", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

// Handle socket connections and broadcast audio
io.on("connection", (socket) => {
  socket.on("broadcastAudio", (audioData) => {
    io.emit("audioBroadcast", audioData);
  });
});

// Start the HTTP server
httpServer.listen(3001, () => {
  console.log("Socket.io server listening on port 3001");
});



