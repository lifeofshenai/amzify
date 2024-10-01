// backend/routes/v1/vendors.ts
import {Router} from "express";
import {
  createPlatform,
  getPlatformById,
  getPlatforms,
  updatePlatform,
} from "../../controllers/platform";
import {authenticate} from "../../middleware/auth";
import {Requirements, Validate} from "../../middleware/validator";

const router: Router = Router();

// Protect all routes; only admins can access
router.use(authenticate);
// router.use(authorize(ROLES.admin));

// CRUD operations
router
  .route("/")
  .post(Validate(Requirements.createPlatform), createPlatform)
  .get(getPlatforms);

router.route("/:id").get(getPlatformById).put(updatePlatform);

export default router;
