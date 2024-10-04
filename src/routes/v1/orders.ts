// backend/routes/v1/productOrderRoutes.ts

import {Router} from "express";
import ProductOrderController from "../../controllers/products";
import {ROLES} from "../../utils/constants";
import {authenticate, authorize} from "../../middleware/auth";

const router: Router = Router();

/**
 * @route   GET /api/v1/orders
 * @desc    Retrieve orders with filtering and pagination
 * @access  Admin and Vendor
 */
router.get("/", authenticate, ProductOrderController.getOrders);

export default router;
