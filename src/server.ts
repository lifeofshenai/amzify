import express, {NextFunction, Response, Request} from "express";
// import compression from "compression";
import cors from "cors";
import routesV1 from "./routes/v1";
// import MorganMiddleware from "./middlewares/morgan";
import {Application} from "express";
import AppConfig from "./config/appConfig";
import MorganMiddleware from "./middleware/morgan";
import errorHandler from "./middleware/handlers/error";

export function createServer(): Application {
  const app = express();

  const domainsFromEnv = process.env.CORS_DOMAINS || "http://localhost:3000";
  const whitelist = domainsFromEnv.split(",").map((item) => item.trim());

  const corsOption = {
    origin: function (origin: any, callback: any) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };

  app.use(express.urlencoded({extended: false}));
  app.use(express.json());
  app.use(cors(corsOption));
  // app.use(compression());
  app.use(MorganMiddleware);

  // app.use(expressfileupload());

  app.use(`/${AppConfig.app.apiVersion}`, routesV1);

  // app.get("/", (req, res, next) => {
  //   return res.json({hello: "hy"});
  // });

  app.use(errorHandler);

  return app;
}
