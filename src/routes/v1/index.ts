import {Router} from "express";
import mainRouter from "./main";
import webhookRouter from "./webhooks";
import auth from "../../middleware/auth";
import storeRouter from "./stores";

const router: Router = Router();

router.use("/", mainRouter);
router.use("/webhook", webhookRouter);

router.use(
  "/stores",
  auth.authenticate,
  // auth.checkRoles(ROLES.admin, ROLES.vendor),
  storeRouter
);

export default router;
