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
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
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
};
class Auth {
  authorize(...roles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
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
  }
}

// export const authenticate = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.header("Authorization");
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res
//       .status(HTTP_STATUS.UNAUTHORIZED_401)
//       .json({message: "No token provided"});
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = JWT.verify(token, process.env.JWT_SECRET!) as JwtPayload;
//     const user: IUser | null = await User.findById(decoded.userId).select(
//       "-password"
//     );
//     if (!user) {
//       return res
//         .status(HTTP_STATUS.UNAUTHORIZED_401)
//         .json({message: "User not found"});
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     return res
//       .status(HTTP_STATUS.UNAUTHORIZED_401)
//       .json({message: "Invalid token"});
//   }
// };

// export const authorize = (roles: string[]) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!req.user || !roles.includes(req.user.role)) {
//       return res.status(HTTP_STATUS.FORBIDDEN_403).json({message: "Forbidden"});
//     }
//     next();
//   };
// };

export default new Auth();
