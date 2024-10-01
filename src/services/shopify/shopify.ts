import "@shopify/shopify-api/adapters/node";
import appConfig from "../../config/appConfig";
import {Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
import {
  Shopify,
  ApiVersion,
  shopifyApi,
  LATEST_API_VERSION,
} from "@shopify/shopify-api";
dotenv.config();

// Shopify.Context.initialize({
//   API_KEY: appConfig.shopify.apiKey,
//   API_SECRET_KEY: appConfig.shopify.apiSecret,
//   SCOPES: appConfig.shopify.scopes.split(","),
//   HOST_NAME: appConfig.shopify.appUrl.replace(/https?:\/\//, ""),
//   API_VERSION: ApiVersion.October23, // Use the latest stable version
//   IS_EMBEDDED_APP: false,
//   SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
// });

const shopify = shopifyApi({
  apiKey: appConfig.shopify.apiKey,
  apiSecretKey: appConfig.shopify.apiSecret,
  //   privateAppStorefrontAccessToken: "",
  scopes: appConfig.shopify.scopes.split(","),
  hostName: appConfig.shopify.appUrl.replace(/https?:\/\//, ""),
  apiVersion: ApiVersion.October23, // Use the latest stable version
  isEmbeddedApp: false,
  //   isCustomStoreApp:true
});

export default shopify;
