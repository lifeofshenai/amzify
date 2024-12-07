import {NextFunction, Request, Response} from "express";
import JWT from "../../utils/jwt";
import {HTTP_STATUS} from "../../utils/constants/statusCodes";
import {IUser, User} from "../../models/User";
import {sendErrorResponse} from "../../utils/server";
import ErrorResponse from "../../utils/error";
import ErrorLogger from "../../utils/logger";

interface JwtPayload {
  userId: string;
  role: string;
  // Add other fields if necessary
}
export const authenticate = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authorization = String(req.headers.authorization);
  let token;
  if (authorization && authorization.includes("Bearer")) {
    token = authorization?.slice(7);
  } else if (req.cookies) {
    // get token from cookies
    console.log(req.cookies);
    token = req.cookies?.authToken;
  } else {
    return sendErrorResponse(
      res,
      new ErrorResponse(HTTP_STATUS.UNAUTHORIZED_401, "Provide a token")
    );
  }
  if (!token) {
    return sendErrorResponse(
      res,
      new ErrorResponse(HTTP_STATUS.UNAUTHORIZED_401, "Provide a token")
    );
  }

  try {
    const payload = await JWT.verifyToken(token);
    if (!payload) {
      return sendErrorResponse(
        res,
        new ErrorResponse(HTTP_STATUS.UNAUTHORIZED_401, "invalid Token")
      );
    }

    const user = await User.findById(payload.id);

    if (!user) {
      return sendErrorResponse(
        res,
        new ErrorResponse(HTTP_STATUS.UNAUTHORIZED_401, "Account not found")
      );
    }

    if (!user.isActive) {
      return sendErrorResponse(
        res,
        new ErrorResponse(HTTP_STATUS.FORBIDDEN_403, "Account not active")
      );
    }
    req.user = user;

    next();
  } catch (err) {
    ErrorLogger(err);
    return sendErrorResponse(
      res,
      new ErrorResponse(HTTP_STATUS.UNAUTHORIZED_401, "invalid Token")
    );
  }
};
export const authorize = async (...roles: string[]) => {
  return (req: Request | any, res: Response, next: NextFunction) => {
    const user = req.user;
    const roleUser = user?.role;
    if (!roleUser) {
      return res.sendStatus(HTTP_STATUS.FORBIDDEN_403);
    }
    const isRoleValid = roles.includes(roleUser);
    if (!isRoleValid) {
      return res.sendStatus(HTTP_STATUS.FORBIDDEN_403);
    }
    next();
  };
};
