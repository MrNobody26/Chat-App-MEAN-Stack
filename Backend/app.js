import express from "express";
import "dotenv/config";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./router/index.js";

const app = express();

app.use(cors());
app.use(express.json());

const dbConnection = process.env.MONGO_DB_URL;
mongoose
  .connect(dbConnection)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("error connecting DB", err);
  });

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// app.use((req, res, next) => {
//   // console.log(req);
//   next();
// });

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
