// backend/services/AnalyticsService.ts

import {Order} from "../../models/Order";
import {Store} from "../../models/Store";
import {HTTP_STATUS} from "../../utils/constants/statusCodes";
import ErrorResponse from "../../utils/error";

class AnalyticsService {
  /**
   * Calculate Total GMV (Gross Merchandise Volume) across all platforms or specific platforms
   * @param platformFilter - Optional array of platforms to filter (e.g., ['shopify', 'amazon'])
   */
  async getTotalGMV(platformFilter?: string[]): Promise<number> {
    try {
      const match: any = {};

      if (platformFilter && platformFilter.length > 0) {
        match.platform = {$in: platformFilter};
      }

      const result = await Order.aggregate([
        {$match: match},
        {
          $group: {
            _id: null,
            totalGMV: {$sum: "$totalPrice"},
          },
        },
      ]);

      return result[0]?.totalGMV || 0;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }

  /**
   * Calculate Total Revenue (Platform's take rate) across all platforms or specific platforms
   * @param takeRate - Percentage take rate (default 10%)
   * @param platformFilter - Optional array of platforms to filter
   */
  async getTotalRevenue(
    takeRate: number = 10,
    platformFilter?: string[]
  ): Promise<number> {
    try {
      const totalGMV = await this.getTotalGMV(platformFilter);
      const revenue = (totalGMV * takeRate) / 100;
      return revenue;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }

  /**
   * Get Sales Trends (Daily Sales) across all platforms or specific platforms
   * @param startDate - Optional start date
   * @param endDate - Optional end date
   * @param platformFilter - Optional array of platforms to filter
   */
  async getDailySales(
    startDate?: Date,
    endDate?: Date,
    platformFilter?: string[]
  ): Promise<any[]> {
    try {
      const match: any = {};

      if (startDate || endDate) {
        match.createdAt = {};
        if (startDate) match.createdAt.$gte = startDate;
        if (endDate) match.createdAt.$lte = endDate;
      }

      if (platformFilter && platformFilter.length > 0) {
        match.platform = {$in: platformFilter};
      }

      const sales = await Order.aggregate([
        {$match: match},
        {
          $group: {
            _id: {$dateToString: {format: "%Y-%m-%d", date: "$createdAt"}},
            dailySales: {$sum: "$totalPrice"},
          },
        },
        {$sort: {_id: 1}},
      ]);

      return sales;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }

  /**
   * Get Revenue per Vendor across all platforms or specific platforms
   * @param takeRate - Percentage take rate (default 10%)
   * @param platformFilter - Optional array of platforms to filter
   */
  async getRevenuePerVendor(
    takeRate: number = 10,
    platformFilter?: string[]
  ): Promise<any[]> {
    try {
      const match: any = {};

      if (platformFilter && platformFilter.length > 0) {
        match.platform = {$in: platformFilter};
      }

      const revenueData = await Order.aggregate([
        {$match: match},
        {
          $group: {
            _id: "$store",
            totalSales: {$sum: "$totalPrice"},
          },
        },
        {
          $lookup: {
            from: "stores",
            localField: "_id",
            foreignField: "_id",
            as: "store",
          },
        },
        {$unwind: "$store"},
        {
          $lookup: {
            from: "users",
            localField: "store.vendor",
            foreignField: "_id",
            as: "vendor",
          },
        },
        {$unwind: "$vendor"},
        {
          $project: {
            _id: 0,
            vendorId: "$vendor._id",
            vendorName: {
              $concat: ["$vendor.firstName", " ", "$vendor.lastName"],
            },
            totalSales: 1,
            revenue: {$multiply: ["$totalSales", takeRate / 100]},
          },
        },
        {$sort: {revenue: -1}},
      ]);

      return revenueData;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }

  /**
   * Get Top Selling Products across all platforms or specific platforms
   * @param limit - Number of top products to retrieve (default 10)
   * @param platformFilter - Optional array of platforms to filter
   */
  async getTopSellingProducts(
    limit: number = 10,
    platformFilter?: string[]
  ): Promise<any[]> {
    try {
      const match: any = {};

      if (platformFilter && platformFilter.length > 0) {
        match.platform = {$in: platformFilter};
      }

      const topProducts = await Order.aggregate([
        {$match: match},
        {$unwind: "$lineItems"},
        {
          $group: {
            _id: "$lineItems.name",
            totalQuantity: {$sum: "$lineItems.quantity"},
            totalSales: {
              $sum: {$multiply: ["$lineItems.price", "$lineItems.quantity"]},
            },
          },
        },
        {$sort: {totalQuantity: -1}},
        {$limit: limit},
        {
          $project: {
            _id: 0,
            productName: "$_id",
            totalQuantity: 1,
            totalSales: 1,
          },
        },
      ]);

      return topProducts;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }

  /**
   * Get Active vs. Inactive Stores across all platforms or specific platforms
   * @param platformFilter - Optional array of platforms to filter
   */
  async getStoreStatus(platformFilter?: string[]): Promise<any> {
    try {
      const match: any = {};

      if (platformFilter && platformFilter.length > 0) {
        match.platforms = {$in: platformFilter};
      }

      const status = await Store.aggregate([
        {$match: match},
        {
          $group: {
            _id: "$isActive",
            count: {$sum: 1},
          },
        },
        {
          $project: {
            _id: 0,
            status: {$cond: ["$_id", "Active", "Inactive"]},
            count: 1,
          },
        },
      ]);

      return status;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }

  /**
   * Get Revenue per Platform
   * @param takeRate - Percentage take rate (default 10%)
   * @param platformFilter - Optional array of platforms to filter
   */
  async getRevenuePerPlatform(
    takeRate: number = 10,
    platformFilter?: string[]
  ): Promise<any[]> {
    try {
      const match: any = {};

      if (platformFilter && platformFilter.length > 0) {
        match.platform = {$in: platformFilter};
      }

      const revenueData = await Order.aggregate([
        {$match: match},
        {
          $group: {
            _id: "$platform",
            totalSales: {$sum: "$totalPrice"},
          },
        },
        {
          $project: {
            _id: 0,
            platform: "$_id",
            totalSales: 1,
            revenue: {$multiply: ["$totalSales", takeRate / 100]},
          },
        },
        {$sort: {revenue: -1}},
      ]);

      return revenueData;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }

  /**
   * Get Combined Sales Trends across all platforms
   * @param startDate - Optional start date
   * @param endDate - Optional end date
   */
  async getCombinedSalesTrends(
    startDate?: Date,
    endDate?: Date
  ): Promise<any[]> {
    try {
      const match: any = {};

      if (startDate || endDate) {
        match.createdAt = {};
        if (startDate) match.createdAt.$gte = startDate;
        if (endDate) match.createdAt.$lte = endDate;
      }

      const sales = await Order.aggregate([
        {$match: match},
        {
          $group: {
            _id: {$dateToString: {format: "%Y-%m-%d", date: "$createdAt"}},
            dailySales: {$sum: "$totalPrice"},
          },
        },
        {$sort: {_id: 1}},
      ]);

      return sales;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }
}

export default new AnalyticsService();
