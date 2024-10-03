// backend/routes/v1/shopify.ts
import {Router} from "express";
import {
  initiateShopifyAuth,
  handleShopifyCallback,
} from "../../controllers/shopify";
import {authenticate, authorize} from "../../middleware/auth";
import {ROLES} from "../../utils/constants";
import {Validate, Requirements} from "../../middleware/validator";

const router: Router = Router();

// Protect routes; only admins can initiate Shopify auth
// router.use(authenticate, authorize([ROLES.admin]));

// Route to initiate Shopify OAuth
router.get(
  "/auth",
  // Validate(Requirements.validateShopifyAuth),
  // authenticate,
  initiateShopifyAuth
);

// Shopify OAuth callback
router.get("/callback", handleShopifyCallback);

export default router;
