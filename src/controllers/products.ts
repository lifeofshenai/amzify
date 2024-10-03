import {Request, Response} from "express";
import {Product} from "../models/Product";
import {Order} from "../models/Order";
import {HTTP_STATUS} from "../utils/constants/statusCodes";
import ErrorResponse from "../utils/error";
import {ROLES, platforms} from "../utils/constants";

class ProductOrderController {
  /**
   * Retrieve products with filtering and pagination
   */
  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const {
        platform,
        vendorId,
        name,
        priceMin,
        priceMax,
        sortBy = "createdAt",
        sortOrder = "desc",
        page = "1",
        limit = "10",
      } = req.query;

      // Build filter object
      const filter: any = {};

      if (platform && typeof platform === "string") {
        if (!Object.values(platforms).includes(platform)) {
          throw new ErrorResponse(
            HTTP_STATUS.BAD_REQUEST_400,
            "Invalid platform filter"
          );
        }
        filter.platform = platform;
      }

      if (vendorId && typeof vendorId === "string") {
        filter.store = vendorId;
      }

      if (name && typeof name === "string") {
        // Case-insensitive partial match
        filter.name = {$regex: name, $options: "i"};
      }

      if (priceMin || priceMax) {
        filter.price = {};
        if (priceMin && !isNaN(Number(priceMin))) {
          filter.price.$gte = Number(priceMin);
        }
        if (priceMax && !isNaN(Number(priceMax))) {
          filter.price.$lte = Number(priceMax);
        }
      }

      // Pagination calculations
      const pageNumber = parseInt(page as string, 10) || 1;
      const pageSize = parseInt(limit as string, 10) || 10;
      const skip = (pageNumber - 1) * pageSize;

      // Sorting
      const sortOptions: any = {};
      const sortFields = ["price", "name", "createdAt", "updatedAt"];
      if (sortBy && typeof sortBy === "string" && sortFields.includes(sortBy)) {
        sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
      } else {
        sortOptions["createdAt"] = -1; // Default sorting
      }

      // Query database
      const [total, products] = await Promise.all([
        Product.countDocuments(filter),
        Product.find(filter)
          .sort(sortOptions)
          .skip(skip)
          .limit(pageSize)
          .populate("store", "name email"), // Populate store details if needed
      ]);

      const totalPages = Math.ceil(total / pageSize);

      res.status(HTTP_STATUS.OK_200).json({
        success: true,
        data: products,
        meta: {
          total,
          page: pageNumber,
          totalPages,
          pageSize,
        },
      });
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        res.status(error.status).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500).json({
          success: false,
          message: "Server Error",
        });
      }
    }
  }

  /**
   * Retrieve orders with filtering and pagination
   */
  async getOrders(req: Request, res: Response): Promise<void> {
    try {
      const {
        platform,
        vendorId,
        status,
        dateFrom,
        dateTo,
        totalMin,
        totalMax,
        sortBy = "createdAt",
        sortOrder = "desc",
        page = "1",
        limit = "10",
      } = req.query;

      // Build filter object
      const filter: any = {};

      if (platform && typeof platform === "string") {
        if (!Object.values(platforms).includes(platform)) {
          throw new ErrorResponse(
            HTTP_STATUS.BAD_REQUEST_400,
            "Invalid platform filter"
          );
        }
        filter.platform = platform;
      }

      if (vendorId && typeof vendorId === "string") {
        filter.store = vendorId;
      }

      if (status && typeof status === "string") {
        // Assuming you have a 'status' field in Order model
        filter.status = status;
      }

      if (dateFrom || dateTo) {
        filter.createdAt = {};
        if (dateFrom && !isNaN(Date.parse(dateFrom as string))) {
          filter.createdAt.$gte = new Date(dateFrom as string);
        }
        if (dateTo && !isNaN(Date.parse(dateTo as string))) {
          filter.createdAt.$lte = new Date(dateTo as string);
        }
      }

      if (totalMin || totalMax) {
        filter.totalPrice = {};
        if (totalMin && !isNaN(Number(totalMin))) {
          filter.totalPrice.$gte = Number(totalMin);
        }
        if (totalMax && !isNaN(Number(totalMax))) {
          filter.totalPrice.$lte = Number(totalMax);
        }
      }

      // Pagination calculations
      const pageNumber = parseInt(page as string, 10) || 1;
      const pageSize = parseInt(limit as string, 10) || 10;
      const skip = (pageNumber - 1) * pageSize;

      // Sorting
      const sortOptions: any = {};
      const sortFields = ["totalPrice", "createdAt", "updatedAt"];
      if (sortBy && typeof sortBy === "string" && sortFields.includes(sortBy)) {
        sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
      } else {
        sortOptions["createdAt"] = -1; // Default sorting
      }

      // Query database
      const [total, orders] = await Promise.all([
        Order.countDocuments(filter),
        Order.find(filter)
          .sort(sortOptions)
          .skip(skip)
          .limit(pageSize)
          .populate("store", "name email"), // Populate store details if needed
      ]);

      const totalPages = Math.ceil(total / pageSize);

      res.status(HTTP_STATUS.OK_200).json({
        success: true,
        data: orders,
        meta: {
          total,
          page: pageNumber,
          totalPages,
          pageSize,
        },
      });
    } catch (error: any) {
      if (error instanceof ErrorResponse) {
        res.status(error.status).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR_500).json({
          success: false,
          message: "Server Error",
        });
      }
    }
  }
}

export default new ProductOrderController();
