// backend/controllers/analytics.ts

import {Request, Response} from "express";
import AnalyticsService from "../services//vendor/AnalyticsService";
import {HTTP_STATUS} from "../utils/constants/statusCodes";
import {sendErrorResponse, sendSuccessResponse} from "../utils/server";
import ErrorLogger from "../utils/logger";

class AnalyticsController {
  /**
   * Get Total GMV
   */
  async getTotalGMV(req: Request, res: Response): Promise<void> {
    try {
      const {platforms: platformFilter} = req.query;
      const platformsArray = platformFilter
        ? (platformFilter as string).split(",")
        : undefined;

      const totalGMV = await AnalyticsService.getTotalGMV(platformsArray);
      sendSuccessResponse(
        res,
        HTTP_STATUS.OK_200,
        {totalGMV},
        "Total GMV retrieved successfully"
      );
    } catch (error: any) {
      ErrorLogger(error, res);
    }
  }

  /**
   * Get Total Revenue
   */
  async getTotalRevenue(req: Request, res: Response): Promise<void> {
    try {
      const {takeRate, platforms: platformFilter} = req.query;
      const rate = takeRate ? parseFloat(takeRate as string) : 10; // Default to 10%
      const platformsArray = platformFilter
        ? (platformFilter as string).split(",")
        : undefined;

      const totalRevenue = await AnalyticsService.getTotalRevenue(
        rate,
        platformsArray
      );
      sendSuccessResponse(
        res,
        HTTP_STATUS.OK_200,
        {totalRevenue},
        "Total Revenue retrieved successfully"
      );
    } catch (error: any) {
      ErrorLogger(error, res);
    }
  }

  /**
   * Get Sales Trends
   */
  async getSalesTrends(req: Request, res: Response): Promise<void> {
    try {
      const {startDate, endDate, platforms: platformFilter} = req.query;
      const platformsArray = platformFilter
        ? (platformFilter as string).split(",")
        : undefined;

      const sales = await AnalyticsService.getDailySales(
        startDate ? new Date(startDate as string) : undefined,
        endDate ? new Date(endDate as string) : undefined,
        platformsArray
      );
      sendSuccessResponse(
        res,
        HTTP_STATUS.OK_200,
        {sales},
        "Sales trends retrieved successfully"
      );
    } catch (error: any) {
      ErrorLogger(error, res);
    }
  }

  /**
   * Get Revenue per Vendor
   */
  async getRevenuePerVendor(req: Request, res: Response): Promise<void> {
    try {
      const {takeRate, platforms: platformFilter} = req.query;
      const rate = takeRate ? parseFloat(takeRate as string) : 10; // Default to 10%
      const platformsArray = platformFilter
        ? (platformFilter as string).split(",")
        : undefined;

      const revenueData = await AnalyticsService.getRevenuePerVendor(
        rate,
        platformsArray
      );
      sendSuccessResponse(
        res,
        HTTP_STATUS.OK_200,
        {revenueData},
        "Revenue per vendor retrieved successfully"
      );
    } catch (error: any) {
      ErrorLogger(error, res);
    }
  }

  /**
   * Get Top Selling Products
   */
  async getTopSellingProducts(req: Request, res: Response): Promise<void> {
    try {
      const {limit, platforms: platformFilter} = req.query;
      const topLimit = limit ? parseInt(limit as string) : 10; // Default to 10
      const platformsArray = platformFilter
        ? (platformFilter as string).split(",")
        : undefined;

      const topProducts = await AnalyticsService.getTopSellingProducts(
        topLimit,
        platformsArray
      );
      sendSuccessResponse(
        res,
        HTTP_STATUS.OK_200,
        {topProducts},
        "Top selling products retrieved successfully"
      );
    } catch (error: any) {
      ErrorLogger(error, res);
    }
  }

  /**
   * Get Store Status
   */
  async getStoreStatus(req: Request, res: Response): Promise<void> {
    try {
      const {platforms: platformFilter} = req.query;
      const platformsArray = platformFilter
        ? (platformFilter as string).split(",")
        : undefined;

      const status = await AnalyticsService.getStoreStatus(platformsArray);
      sendSuccessResponse(
        res,
        HTTP_STATUS.OK_200,
        {status},
        "Store status retrieved successfully"
      );
    } catch (error: any) {
      ErrorLogger(error, res);
    }
  }

  /**
   * Get Revenue per Platform
   */
  async getRevenuePerPlatform(req: Request, res: Response): Promise<void> {
    try {
      const {takeRate, platforms: platformFilter} = req.query;
      const rate = takeRate ? parseFloat(takeRate as string) : 10; // Default to 10%

      const revenueData = await AnalyticsService.getRevenuePerPlatform(
        rate,
        platformFilter ? (platformFilter as string).split(",") : undefined
      );
      sendSuccessResponse(
        res,
        HTTP_STATUS.OK_200,
        {revenueData},
        "Revenue per platform retrieved successfully"
      );
    } catch (error: any) {
      ErrorLogger(error, res);
    }
  }
}

export default new AnalyticsController();
