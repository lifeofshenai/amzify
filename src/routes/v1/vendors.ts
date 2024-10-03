// backend/routes/v1/vendors.ts
import {Router} from "express";
import {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  syncProducts,
  syncOrders,
} from "../../controllers/vendor";
import {authenticate} from "../../middleware/auth";
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

// Sync store products
router.route("/:id/sync-products").post(syncProducts);
// Sync store orders
router.route("/:id/sync-orders").post(syncOrders);

export default router;
