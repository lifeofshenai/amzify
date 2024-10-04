import {body} from "express-validator";
import {ROLES} from "../../../utils/constants";

const mainRequirement = {
  createPlatform: [
    body("name").isString(),
    body("url").optional().isString(),
    body("description").optional().isString(),
  ],
  signup: [
    body("password")
      .isString()
      .isLength({min: 8})
      .withMessage("Password must be at least 8 characters"),
    body("phoneNumber").isString().isLength({min: 11, max: 13}),
    body("email").isString().isEmail(),
    body("role").isString().withMessage("Invalid user role"),
  ],

  login: [
    body("email").isString(),
    body("password").isString().isLength({min: 5}),
    body("deviceToken").optional().isString(),
  ],

  forgotPassword: [body("email").isEmail().optional()],

  resetPassword: [
    body("password").isString().isLength({min: 5}),
    body("token").isString(),
  ],
  updatePassword: [
    body("currentPassword").isString().isLength({min: 5}),
    body("newPassword").isString().isLength({min: 5}),
  ],
};

export default mainRequirement;
