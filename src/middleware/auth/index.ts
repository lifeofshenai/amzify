import {NextFunction, Request, Response} from "express";
import JWT from "../../utils/jwt";
import {HTTP_STATUS} from "../../utils/constants/statusCodes";
import {User} from "../../models/User";
import {sendErrorResponse} from "../../utils/server";
import ErrorResponse from "../../utils/error";
import ErrorLogger from "../../utils/logger";

class Auth {
  async authenticate(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const authorization = String(req.headers.authorization);
    if (!authorization || !authorization.includes("Bearer")) {
      return sendErrorResponse(
        res,
        new ErrorResponse(HTTP_STATUS.UNAUTHORIZED_401, "Provide a token")
      );
    }

    const token = authorization?.slice(7);
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
  }

  checkRoles(...roles: string[]) {
    return async (req: Request | any, res: Response, next: NextFunction) => {
      const user = req.user;
      // console.log(user);
      const roleUser = user.role;
      if (!roleUser) {
        return res.sendStatus(HTTP_STATUS.FORBIDDEN_403);
      }
      const isRoleValid = roles.includes(roleUser);
      if (!isRoleValid) {
        return res.sendStatus(HTTP_STATUS.FORBIDDEN_403);
      }
      next();
    };
  }
}

export default new Auth();
