import {Router} from "express";
import {Requirements, Validate} from "../../middleware/validator";
import {authenticate} from "../../middleware/auth";
import {
  createAdmin,
  currentUser,
  login,
  logout,
  signUp,
} from "../../controllers/auth";

const mainRouter: Router = Router();
mainRouter.route("/login").post(Validate(Requirements.login), login);
mainRouter.route("/logout").get(logout);

mainRouter.route("/signup").post(Validate(Requirements.signup), signUp);
mainRouter.route("/create-admin").post(createAdmin);

mainRouter.route("/profile").get(authenticate, currentUser);

export default mainRouter;
