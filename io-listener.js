import { createServer } from "http";
import { Server } from "socket.io";
import validateUser from "./socket/validateUser.js";
const startWebsocket = (app) => {
  const server = createServer(app);
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("New client connected");
    const id = socket.handshake.query.id;

    socket.on("join-room", async (arg) => {
      const { kanbanId, userId } = arg;
      try {
        await validateUser(userId, kanbanId);
        io.to(kanbanId).emit("member-joined", userId);
      } catch (err) {
        io.to(socket.id).emit("join-room-error", err.message);
      }
    });

    socket.on("update-kanban", (arg) => {
      socket.to(kanbanId).emit("kanban-updated", { kanbanId, userId });
    });

    socket.on("movemouse", (data) => {
      data.id = id;
      socket.to(kanbanId).emit("movingmouse", data);
    });

    socket;

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
export default startWebsocket;
