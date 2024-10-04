import fs from "fs";
import {formate01} from "../date";
import {sendErrorResponse} from "../server";
import ErrorResponse from "../error";

export const ErrorLogger = (error: any, response?: any) => {
  let err = {...error};
  err.message = error.message;

  const date = new Date();
  console.log("===============================");
  console.log(error);
  console.log("===============================");

  const logMessage = `${date.toISOString()} - ${error.stack}\n`;
  fs.appendFile(`logs/${formate01(date)}.log`, logMessage, (err) => {
    if (err) {
      console.error("Error writing to error.log:", err);
    }
  });

  if (response) {
    //   Mongoose error
    if (error.name === "CastError") {
      const message = `Resource not found`;
      err = new ErrorResponse(404, message);
    }
    // Mongoose duplicate key
    if (error.code === 11000) {
      const message = `${Object.keys(error.keyValue)[0]}: ${
        Object.values(error.keyValue)[0]
      } has already been used`;
      err = new ErrorResponse(400, message);
    }
    //   Mongoose validation error
    if (error.name === "ValidationError") {
      const message = Object.values(error.errors).map(
        (val: any) => val.message
      );
      err = new ErrorResponse(400, message);
    }
    return sendErrorResponse(response, err);
  }
};

export default ErrorLogger;
