// backend/routes/v1/productOrderRoutes.ts

import {Router} from "express";
import ProductOrderController from "../../controllers/products";
import {ROLES} from "../../utils/constants";
import {authenticate, authorize} from "../../middleware/auth";

const router: Router = Router();

/**
 * @route   GET /api/v1/products
 * @desc    Retrieve products with filtering and pagination
 * @access  Admin and Vendor
 */
router.get("/", authenticate, ProductOrderController.getProducts);

export default router;
