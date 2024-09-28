import {Router} from "express";
import {Requirements, Validate} from "../../middleware/validator";
import auth from "../../middleware/auth";
import {currentUser, login, signUp} from "../../controllers/auth";

const mainRouter: Router = Router();
mainRouter.route("/login").post(Validate(Requirements.login), login);

mainRouter.route("/signup").post(Validate(Requirements.signup), signUp);

mainRouter.route("/profile").get(auth.authenticate, currentUser);

export default mainRouter;
