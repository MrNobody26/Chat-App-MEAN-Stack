import express from "express";
import "dotenv/config";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter, messageRouter, groupRouter } from "./router/index.js";
import { socketSetUp } from "./socket.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/v1/users", userRouter);
app.use("/v1/message", messageRouter);
app.use("/v1/group", groupRouter);

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
    origin: "*", //change it to angular code running port port later
    methods: ["GET", "POST"],
  },
});

socketSetUp(io);

server.listen(process.env.PORT, () => {
  console.log("listening on port: ", process.env.PORT);
});
