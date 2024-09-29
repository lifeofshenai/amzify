// backend/controllers/vendors.ts
import {Request, Response} from "express";
import VendorService from "../services/vendor/VendorService";
import {HTTP_STATUS} from "../utils/constants/statusCodes";
import {sendErrorResponse, sendSuccessResponse} from "../utils/server";
import {IStore} from "../models/Store";
import ErrorResponse from "../utils/error";

export const createVendor = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const payload = req.body;
    const user = req.user; // Assuming req.user is populated by auth middleware

    // Validate required fields
    const requiredFields = [
      "name",
      "description",
      "shopifyStoreId",
      "shopifyAccessToken",
    ];
    for (const field of requiredFields) {
      if (!payload[field]) {
        return sendErrorResponse(
          res,
          new ErrorResponse(HTTP_STATUS.BAD_REQUEST_400, `${field} is required`)
        );
      }
    }

    const store: IStore = await VendorService.createVendor(user, payload);

    sendSuccessResponse(
      res,
      HTTP_STATUS.CREATED_201,
      {store},
      "Vendor created successfully"
    );
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const getVendors = async (req: Request, res: Response): Promise<any> => {
  try {
    const stores: IStore[] = await VendorService.getVendors();
    sendSuccessResponse(
      res,
      HTTP_STATUS.OK_200,
      {stores},
      "Vendors retrieved successfully"
    );
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const getVendorById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {id} = req.params;
    const store: IStore = await VendorService.getVendorById(id);
    sendSuccessResponse(
      res,
      HTTP_STATUS.OK_200,
      {store},
      "Vendor retrieved successfully"
    );
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const updateVendor = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {id} = req.params;
    const payload = req.body;
    const store: IStore = await VendorService.updateVendor(id, payload);
    sendSuccessResponse(
      res,
      HTTP_STATUS.OK_200,
      {store},
      "Vendor updated successfully"
    );
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

export const deleteVendor = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {id} = req.params;
    const store: IStore = await VendorService.deleteVendor(id);
    sendSuccessResponse(
      res,
      HTTP_STATUS.OK_200,
      {store},
      "Vendor deleted successfully"
    );
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

/**
 * Endpoint to synchronize products from Shopify
 */
export const syncProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {id} = req.params; // Store ID
    const products = await VendorService.syncProducts(id);
    sendSuccessResponse(
      res,
      HTTP_STATUS.OK_200,
      {products},
      "Products synchronized successfully"
    );
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
