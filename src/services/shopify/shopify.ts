import "@shopify/shopify-api/adapters/node";
import appConfig from "../../config/appConfig";
import dotenv from "dotenv";
import {ApiVersion, shopifyApi} from "@shopify/shopify-api";
dotenv.config();

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
