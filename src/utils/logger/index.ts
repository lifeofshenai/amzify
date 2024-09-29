import fs from "fs";
import {formate01} from "../date";
import {sendErrorResponse} from "../server";

export const ErrorLogger = (error: any, response?: any) => {
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

  if (response) return sendErrorResponse(response, error);
};

export default ErrorLogger;
