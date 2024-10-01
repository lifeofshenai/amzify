// backend/controllers/vendors.ts
import {Request, Response} from "express";
import VendorService from "../services/vendor/VendorService";
import {HTTP_STATUS} from "../utils/constants/statusCodes";
import {sendErrorResponse, sendSuccessResponse} from "../utils/server";
import {IStore} from "../models/Store";
import ErrorResponse from "../utils/error";
import {IUser} from "../models/User";

export const createVendor = async (
  req: Request | any,
  res: Response
): Promise<any> => {
  try {
    const payload = req.body;

    const store: IStore = await VendorService.createVendor(payload);

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

export const getVendors = async (
  req: Request | any,
  res: Response
): Promise<any> => {
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
  req: Request | any,
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
  req: Request | any,
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

/**
 * Endpoint to synchronize products from Shopify
 */
export const syncProducts = async (
  req: Request | any,
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
