import dotenv from "dotenv";
dotenv.config();

import {Server} from "net";
import {createServer} from "./server";
import AppConfig from "./config/appConfig";
import connectDB from "./database";
import {Server as socketServer} from "socket.io";
import http from "http";
import Logger from "./middleware/morgan/logger";

const PORT = AppConfig.app.port;

function startServer(): Server {
  const app = createServer();

  const onListening = () => {
    Logger.debug(
      `App ${AppConfig.app.name} with api version ${AppConfig.app.apiVersion} is starting`
    );

    const addr = server.address();
    const bind =
      typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;

    Logger.debug(`App is listening on ${bind}`);
    connectDB();
  };

  const server = http.createServer(app);

  server.listen(PORT);
  server.on("listening", onListening);

  process.on("unhandledRejection", (err: any, promise) => {
    console.log(`Error: ${err?.message}`);
    server.close(() => process.exit(1));
  });

  const io = new socketServer(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  interface User {
    userId: string;
  }

  const users: {[key: string]: User} = {};

  io.on("connection", (socket) => {
    socket.on("register", (userId: string) => {
      console.log("registering", userId);
      console.log("registerd users", users);
      users[socket.id] = {userId};
    });

    socket.on("disconnect", () => {
      delete users[socket.id];
    });
  });

  return server;
}

startServer();
