import {Router} from "express";
import mainRouter from "./main";
import webhookRouter from "./webhooks";
import storeRouter from "./stores";
import vendorRouter from "./vendors";

const router: Router = Router();

router.use("/", mainRouter);
router.use("/webhook", webhookRouter);

router.use("/stores", storeRouter);
router.use("/stores", storeRouter); // Protected within storeRouter
router.use("/vendors", vendorRouter); // Protected within vendorRouter

export default router;
