import {Request, Response} from "express";
import {LoginType, SignUpType} from "../../types/auth";
import {HTTP_STATUS} from "../../utils/constants/statusCodes";
import {AuthService} from "../../services/auth";
import {sendErrorResponse, sendSuccessResponse} from "../../utils/server";
import ErrorLogger from "../../utils/logger";
import {ROLES} from "../../utils/constants";
import VendorService from "../../services/vendor/VendorService";

export const currentUser = async (
  req: Request | any,
  res: Response
): Promise<any> => {
  try {
    const {user}: any = req;

    if (user.role === ROLES.vendor) {
      const store = await VendorService.getVendorStore(user._id);
      return sendSuccessResponse(res, HTTP_STATUS.OK_200, {user, store});
    }
    return sendSuccessResponse(res, HTTP_STATUS.OK_200, {user});
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export const logout = async (
  req: Request | any,
  res: Response
): Promise<any> => {
  try {
    const {user}: any = req;

    res.cookie("token", "none").sendStatus(HTTP_STATUS.OK_200);
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

export const login = async (
  req: Request | any,
  res: Response
): Promise<any> => {
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

export const signUp = async (
  req: Request | any,
  res: Response
): Promise<any> => {
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

export const createAdmin = async (
  req: Request | any,
  res: Response
): Promise<any> => {
  try {
    const payload: SignUpType = {
      firstName: "Admify",
      lastName: "Admin",
      email: "admin@amzify.com",
      role: ROLES.admin,
      password: "@Amzify123",
      isActive: true,
    };
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
