// backend/routes/v1/vendors.ts
import {Router} from "express";
import {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
  syncProducts,
} from "../../controllers/vendor";
import auth, {authenticate} from "../../middleware/auth";
import {ROLES} from "../../utils/constants";

const router: Router = Router();

// Protect all routes; only admins can access
// router.use(authenticate, auth.authorize([ROLES.admin]));

// CRUD operations
router.route("/").post(createVendor).get(getVendors);

router.route("/:id").get(getVendorById).put(updateVendor).delete(deleteVendor);

// Sync products from Shopify
router.route("/:id/sync-products").post(syncProducts);

export default router;
