// backend/routes/v1/analytics.ts

import {Router} from "express";
import AnalyticsController from "../../controllers/analytics";
import {ROLES} from "../../utils/constants";
import {authenticate, authorize} from "../../middleware/auth";

const router: Router = Router();

// Protect all routes; only admins can access
router.use(authenticate);
// router.use(authorize([ROLES.admin]));

/**
 * @route GET /api/v1/analytics
 * @desc Get all analytics
 * @access Admin
 */
router.get("/", AnalyticsController.getAnalytics);

/**
 * @route GET /api/v1/analytics/metrics
 * @desc Get all analytics
 * @access Admin
 */
router.get("/metrics", AnalyticsController.getMetrics);
/**
 * @route GET /api/v1/analytics/gmv
 * @desc Get Total Gross Merchandise Volume (GMV)
 * @access Admin
 */
router.get("/gmv", AnalyticsController.getTotalGMV);

/**
 * @route GET /api/v1/analytics/revenue
 * @desc Get Total Revenue
 * @access Admin
 */
router.get("/revenue", AnalyticsController.getTotalRevenue);

/**
 * @route GET /api/v1/analytics/sales-trends
 * @desc Get Sales Trends
 * @access Admin
 */
router.get("/sales-trends", AnalyticsController.getSalesTrends);

/**
 * @route GET /api/v1/analytics/revenue-per-vendor
 * @desc Get Revenue per Vendor
 * @access Admin
 */
router.get("/revenue-per-vendor", AnalyticsController.getRevenuePerVendor);

/**
 * @route GET /api/v1/analytics/top-products
 * @desc Get Top Selling Products
 * @access Admin
 */
router.get("/top-products", AnalyticsController.getTopSellingProducts);

/**
 * @route GET /api/v1/analytics/store-status
 * @desc Get Active vs. Inactive Stores
 * @access Admin
 */
router.get("/store-status", AnalyticsController.getStoreStatus);

/**
 * @route GET /api/v1/analytics/revenue-per-platform
 * @desc Get Revenue per Platform
 * @access Admin
 */
router.get("/revenue-per-platform", AnalyticsController.getRevenuePerPlatform);

export default router;
