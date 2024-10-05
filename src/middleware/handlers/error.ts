import {NextFunction, Request, Response} from "express";
import AppConfig from "../../config/appConfig";
import Logger, {ErrorLogger} from "../../utils/logger";

type ResponseType = {
  message?: string;
  success: boolean;
};

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const response: ResponseType = {success: false};
  if (err.message) {
    ErrorLogger(err);
    response.message = AppConfig.app.isDevelopment
      ? err.message
      : "Something wrong!";
  }

  res.status(400).send(response);
}

export default errorHandler;
