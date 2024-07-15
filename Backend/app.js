import express from "express";
import "dotenv/config";
import userRouter from "./router/index.js";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
  },
});

app.use((req, res, next) => {
  console.log(req);
  next();
});

io.on("connection", (socket) => {
  console.log(`user connected to ${socket.id}`);

  socket.on("mesage_sent", (data) => {
    console.log(data);
  });
  socket.broadcast.emit("recive_message", { data: "recieved from backend" });
});

app.use("/v1", userRouter);

server.listen(process.env.PORT, () => {
  console.log("listening on port: ", process.env.PORT);
});
