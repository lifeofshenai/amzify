import express, {NextFunction, Response, Request} from "express";
// import compression from "compression";
import cors from "cors";
import routesV1 from "./routes/v1";
// import MorganMiddleware from "./middlewares/morgan";
import {Application} from "express";
import AppConfig from "./config/appConfig";
import MorganMiddleware from "./middleware/morgan";
import errorHandler from "./middleware/handlers/error";
// import "./scheduler";

export function createServer(): Application {
  const app = express();

  const domainsFromEnv = process.env.CORS_DOMAINS || "http://localhost:3000";
  const whitelist = domainsFromEnv.split(",").map((item) => item.trim());

  const corsOption = {
    // origin: "*",
    function(origin: any, callback: any) {
      console.log(origin);
      if (!origin || whitelist.indexOf(origin) !== -1) {
        console.log(whitelist.indexOf(origin));
        callback(null, true);
      } else {
        callback(Error("Not allowed by CORS"));
      }
    },
    // credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
  };

  app.use(express.urlencoded({extended: false}));
  app.use(express.json());
  app.use(cors(corsOption));

  // app.use(
  //   cors({
  //     origin: "*",
  //     // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  //     credentials: false,
  //   })
  // );
  // app.use(compression());
  app.use(MorganMiddleware);

  app.use(`/api/v${AppConfig.app.apiVersion}`, routesV1);

  app.use(errorHandler);

  return app;
}
// import "./script/or ders.dev";
