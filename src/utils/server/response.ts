import {Response} from "express";
import ErrorResponse from "../error";

export const responseType = {
  SUCCESS: "Success",
  ERROR: "Error",
};
export const sendResponse = (
  response: Response,
  status: number,
  props: any = {}
) => {
  response.status(status).send({
    ...props,
    status,
    time: Date.now(),
  });
};

export const sendErrorResponse = (response: Response, err: any) =>
  sendResponse(response, err.status ?? 500, {
    type: responseType.ERROR,
    message: err.message,
    data: null,
  });

export const sendSuccessResponse = (
  response: Response,
  status: number,
  data: any,
  message?: string
) =>
  sendResponse(response, status, {
    type: responseType.SUCCESS,
    data,
    message,
  });
