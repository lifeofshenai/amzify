// backend/routes/v1/vendors.ts
import {Router} from "express";
import {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  syncProducts,
} from "../../controllers/vendor";
import {authenticate, authorize} from "../../middleware/auth";
import {ROLES} from "../../utils/constants";
import {Requirements, Validate} from "../../middleware/validator";

const router: Router = Router();

// Protect all routes; only admins can access
router.use(authenticate);
// router.use(authorize(ROLES.admin));

// CRUD operations
router
  .route("/")
  .post(Validate(Requirements.createVendor), createVendor)
  .get(getVendors);

router.route("/:id").get(getVendorById).put(updateVendor);

// Sync products from Shopify
router.route("/:id/sync-products").post(syncProducts);

export default router;
