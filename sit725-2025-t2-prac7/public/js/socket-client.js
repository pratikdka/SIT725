// public/js/socket-client.js
// Socket.IO client is exposed by the server at /socket.io/socket.io.js
const socket = io();

socket.on("connect", () => {
  console.log("Socket connected Successfully on:", socket.id);
});

socket.on("server:hello", (data) => {
  console.log("Response from the server:", data);
});

window.socketPing = () => socket.emit("client:ping", { at: new Date().toISOString() });
socket.on("server:pong", (data) => {
  console.log("pong:", data);
});
