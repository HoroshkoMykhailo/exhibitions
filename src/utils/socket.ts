import { io } from "socket.io-client";
import { SocketUrl } from "../constants/constants";

export const socket = io(SocketUrl);

socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

socket.on("connect_error", (error) => {
  console.log("Connection Error:", error);
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
});