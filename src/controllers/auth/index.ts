import {Request, Response} from "express";
import {LoginType, SignUpType} from "../../types/auth";
import {HTTP_STATUS} from "../../utils/constants/statusCodes";
import {AuthService} from "../../services/auth";
import {sendErrorResponse, sendSuccessResponse} from "../../utils/server";
import ErrorLogger from "../../utils/logger";

export const currentUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {user}: any = req;
    sendSuccessResponse(res, HTTP_STATUS.OK_200, {user});
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};
export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const payload: LoginType = req.body;
    const {token, user, err} = await AuthService.login(payload);
    if (err) throw err;

    if (payload.deviceToken) user.deviceToken = payload.deviceToken;

    user.lastLogin = new Date();
    await user.save();

    sendSuccessResponse(
      res,
      HTTP_STATUS.OK_200,
      {user, token},
      "Logged in successfully"
    );
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export const signUp = async (req: Request, res: Response): Promise<any> => {
  try {
    const payload: SignUpType = req.body;
    const {user, err} = await AuthService.signUp(payload);
    if (err) throw err;

    sendSuccessResponse(
      res,
      HTTP_STATUS.CREATED_201,
      {user},
      "User created successfully"
    );
  } catch (error) {
    ErrorLogger(error, res);
  }
};
