// backend/controllers/shopify.ts
import {Request, Response} from "express";
// import shopify from "../services/shopify/shopify";
import ErrorResponse from "../utils/error";
import {HTTP_STATUS} from "../utils/constants/statusCodes";
import {Store} from "../models/Store";
import {platforms, ROLES} from "../utils/constants";
import shopify from "../services/shopify/shopify";
import {encrypt} from "../utils/encryption";
import VendorService from "../services/vendor/VendorService";
import {sendErrorResponse, sendSuccessResponse} from "../utils/server";
import ErrorLogger from "../utils/logger";
import appConfig from "../config/appConfig";

export const initiateShopifyAuth = async (
  req: Request | any,
  res: Response
): Promise<void> => {
  try {
    const {user} = req;
    const {storeId} = req.query;

    const store = storeId
      ? await VendorService.getVendorById(storeId, "+credentials")
      : await VendorService.getVendorStore(user?._id, "+credentials");
    if (!store) {
      throw new ErrorResponse(HTTP_STATUS.NOT_FOUND_404, `Store not found`);
    }

    const {credentials} = store;

    const storeUrl =
      !credentials || !credentials[platforms.shopify]?.storeId
        ? null
        : `${credentials[platforms.shopify]?.storeId}.myshopify.com`;

    if (!storeUrl || typeof storeUrl !== "string") {
      throw new ErrorResponse(HTTP_STATUS.BAD_REQUEST_400, "Invalid store URL");
    }

    const shop = shopify.utils.sanitizeShop(storeUrl, true);
    if (!shop)
      throw new ErrorResponse(HTTP_STATUS.BAD_REQUEST_400, "Invalid store URL");

    await shopify.auth.begin({
      // this redirect automatically
      callbackPath: `/api/v${appConfig.app.apiVersion}/shopify/callback`,
      shop,
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    });
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
    const shopId = shop.split(".")[0];
    // Here, you can create or update the store in your database
    let store = await Store.findOne({
      [`credentials.${platforms.shopify}`]: shopId,
    });
    const shopifyAccessToken = encrypt(accessToken!);
    if (!store) {
      throw new ErrorResponse(
        HTTP_STATUS.NOT_FOUND_404,
        `Store:${shopId} does not exisist`
      );
    } else {
      // Update existing store with new access token

      store.credentials[platforms.shopify].accessToken = shopifyAccessToken!;
      store.isActive = true;
      await store.save();
    }
    // TODO redirect to success or failed page
    res.redirect(`${appConfig.shopify.appUrl}/vendor/profile`);
    // res.status(HTTP_STATUS.OK_200).json({
    //   success: true,
    //   message: "Shopify store connected successfully",
    //   //   store,
    // });
  } catch (error: any) {
    ErrorLogger(error, res);
  }
};
