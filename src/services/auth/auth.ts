import {ClientSession} from "mongoose";
import {IUser, User} from "../../models/User";
import {LoginType, SignUpType} from "../../types/auth";
import {HTTP_STATUS} from "../../utils/constants/statusCodes";
import ErrorResponse from "../../utils/error";
import {ErrorLogger} from "../../utils/logger";

class AuthService {
  async login(
    payload: LoginType
  ): Promise<
    | {token: string; user: IUser; err?: null}
    | {err: ErrorResponse; token?: null; user?: null}
  > {
    try {
      const user = await User.findOne({
        email: payload.email.toLowerCase(),
      }).select("+password");

      if (!user) {
        throw new Error("Invalid credentials, check your email again.");
      }

      const isValid = await user.matchPassword(payload.password);

      if (!isValid) {
        throw new Error("Invalid credentials, check your password again.");
      }

      const token = user.getSignedJwtToken();

      if (!token) {
        throw new Error("Invalid token");
      }

      return {token, user};
    } catch (error: any) {
      ErrorLogger(error);
      return {err: error};
    }
  }

  async signUp(payload: SignUpType, session?: ClientSession) {
    try {
      const user = new User(payload);

      await user.save({session});

      if (!user)
        throw new ErrorResponse(
          HTTP_STATUS.BAD_REQUEST_400,
          `User not created`
        );

      return {user};
    } catch (error: any) {
      ErrorLogger(error);
      return {
        err: error,
      };
    }
  }

  async updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{user: IUser} | {err: any}> {
    try {
      const user = await User.findById(userId).select("+password");

      if (!user) {
        throw new Error("Invalid request, try loggin in again.");
      }

      const isValid = await user.matchPassword(currentPassword);

      if (!isValid) {
        throw new Error("check your current password again.");
      }

      user.password = newPassword;

      await user.save({validateBeforeSave: true});

      return {user};
    } catch (error: any) {
      ErrorLogger(error);
      return {err: error};
    }
  }
}

export default new AuthService();
