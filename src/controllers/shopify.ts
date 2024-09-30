// backend/controllers/shopify.ts
import {Request, Response} from "express";
// import shopify from "../services/shopify/shopify";
import ErrorResponse from "../utils/error";
import {HTTP_STATUS} from "../utils/constants/statusCodes";
import {Store} from "../models/Store";
import {ROLES} from "../utils/constants";
import shopify from "../services/shopify/shopify";
import {encrypt} from "../utils/encryption";
import VendorService from "../services/vendor/VendorService";
import {sendErrorResponse} from "../utils/server";
import ErrorLogger from "../utils/logger";
import appConfig from "../config/appConfig";

export const initiateShopifyAuth = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  try {
    const {storeId} = req.query;

    const store = await VendorService.getVendorById(storeId);
    if (!store) {
      throw new ErrorResponse(HTTP_STATUS.NOT_FOUND_404, `Store not found`);
    }
    const storeUrl = `${store.shopifyStoreId}.myshopify.com`;

    if (!storeUrl || typeof storeUrl !== "string") {
      throw new ErrorResponse(HTTP_STATUS.BAD_REQUEST_400, "Invalid store URL");
    }

    const shop = shopify.utils.sanitizeShop(storeUrl, true);
    if (!shop)
      throw new ErrorResponse(HTTP_STATUS.BAD_REQUEST_400, "Invalid store URL");

    const redirectUrl = await shopify.auth.begin({
      callbackPath: `/api/v${appConfig.app.apiVersion}/shopify/callback`,
      shop,
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    });

    res.redirect(redirectUrl);
  } catch (error: any) {
    ErrorLogger(error, res);
  }
};

export const handleShopifyCallback = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  try {
    const {session} = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    const {shop, accessToken, expires} = session;

    // Here, you can create or update the store in your database
    let store = await Store.findOne({shopifyStoreId: shop});
    const shopifyAccessToken = encrypt(accessToken!);
    if (!store) {
      // If store doesn't exist, create a new entry
      store = new Store({
        vendor: req.user?._id,
        platforms: [], // Assign relevant platforms
        name: shop,
        description: `Store connected via Shopify`,
        shopifyStoreId: shop,
        shopifyAccessToken,
        isActive: true,
      });
      await store.save();
    } else {
      // Update existing store with new access token
      store.shopifyAccessToken = shopifyAccessToken!;
      store.isActive = true;
      await store.save();
    }

    res.status(HTTP_STATUS.OK_200).json({
      success: true,
      message: "Shopify store connected successfully",
      //   store,
    });
  } catch (error: any) {
    res.status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR_500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
};
