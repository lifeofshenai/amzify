import {Router} from "express";
import mainRouter from "./main";
import webhookRouter from "./webhooks";
import storeRouter from "./stores";
import vendorRouter from "./vendors";
import shopifyRouter from "./shopify";
import platformRouter from "./platforms";
import analyticsRouter from "./analytics"; // Analytics routes

const router: Router = Router();

router.use("/auth", mainRouter);
router.use("/webhook", webhookRouter);

router.use("/stores", storeRouter); // Protected within storeRouter
router.use("/vendors", vendorRouter); // Protected within vendorRouter
router.use("/shopify", shopifyRouter);
router.use("/platforms", platformRouter);
router.use("/analytics", analyticsRouter); // Add Analytics routes

export default router;
