import "@shopify/shopify-api/adapters/node";
import appConfig from "../../config/appConfig";
import {ApiVersion, shopifyApi} from "@shopify/shopify-api";

const shopify = shopifyApi({
  apiKey: appConfig.shopify.apiKey,
  apiSecretKey: appConfig.shopify.apiSecret,
  scopes: appConfig.shopify.scopes.split(","),
  hostName: appConfig.shopify.appUrl.replace(/https?:\/\//, ""),
  apiVersion: ApiVersion.October23, // Use the latest stable version
  isEmbeddedApp: false,
  //   isCustomStoreApp:true
});

export default shopify;
