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
    const {files} = req;

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
 * Endpoint to synchronize store products
 */
export const syncProducts = async (
  req: Request | any,
  res: Response
): Promise<any> => {
  try {
    const {id} = req.params; // Store ID
    const {products, message} = await VendorService.syncProducts(id);
    sendSuccessResponse(res, HTTP_STATUS.OK_200, {products}, message);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

/**
 * Endpoint to synchronize store products
 */
export const syncOrders = async (
  req: Request | any,
  res: Response
): Promise<any> => {
  try {
    const {id} = req.params; // Store ID
    const {orders, message} = await VendorService.syncOrders(id);
    sendSuccessResponse(res, HTTP_STATUS.OK_200, {orders}, message);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

/**
 * Endpoint to fetch store payouts
 */
export const fetchPayouts = async (
  req: Request | any,
  res: Response
): Promise<any> => {
  try {
    const {id} = req.params; // Store ID
    const {payouts, message} = await VendorService.fetchPayouts(id);
    sendSuccessResponse(res, HTTP_STATUS.OK_200, {payouts}, message);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

/**
 * Endpoint to fetch store balance
 */
export const fetchBalance = async (
  req: Request | any,
  res: Response
): Promise<any> => {
  try {
    const {id} = req.params; // Store ID
    const {balances, message} = await VendorService.fetchBalances(id);
    sendSuccessResponse(res, HTTP_STATUS.OK_200, {balances}, message);
  } catch (error) {
    sendErrorResponse(res, error);
  }
};
