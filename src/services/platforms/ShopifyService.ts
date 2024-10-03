import {IPlatformService} from "./IPlatformService";
import {Store} from "../../models/Store";
import Shopify from "../shopify/shopify"; // Existing Shopify service
import {decrypt} from "../../utils/encryption";
import {Product} from "../../models/Product";
import {Order} from "../../models/Order";
import ErrorResponse from "../../utils/error";
import {HTTP_STATUS} from "../../utils/constants/statusCodes";
import {platforms} from "../../utils/constants";
import ShopifyService from "../shopify/ShopifyService";

class ShopifyPlatformService implements IPlatformService {
  /**
   * Fetch and synchronize products from Shopify
   * @param storeId - Store ID
   */
  async fetchProducts(storeId: string): Promise<any[]> {
    try {
      const store = await Store.findById(storeId).select("+credentials");
      if (!store) {
        throw new Error("Store not found");
      }
      const {credentials} = store;
      const accessToken = decrypt(credentials[platforms.shopify].accessToken);
      const shopifyService = new ShopifyService(
        credentials[platforms.shopify].storeId,
        accessToken
      );

      const products = await shopifyService.fetchProducts();

      // Iterate through products and perform upsert to prevent duplicates
      const upsertPromises = products.map(async (product: any) => {
        const filter = {
          platform: platforms.shopify,
          platformProductId: product.id.toString(),
        };
        const update = {
          store: store._id,
          platform: platforms.shopify,
          platformProductId: product.id.toString(),
          name: product.title,
          description: product.body_html || "",
          price: parseFloat(product.variants[0]?.price) || 0,
          inventory: product.variants[0]?.inventory_quantity?.toString() || "0",
          image: product.images[0]?.src || "",
        };
        const options = {upsert: true, new: true, setDefaultsOnInsert: true};
        return Product.findOneAndUpdate(filter, update, options);
      });

      await Promise.all(upsertPromises);

      return products;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }

  /**
   * Fetch and synchronize orders from Shopify
   * @param storeId - Store ID
   */
  async fetchOrders(storeId: string): Promise<any[]> {
    try {
      const store = await Store.findById(storeId).select("+credentials");
      if (!store) {
        throw new Error("Store not found");
      }

      const {credentials} = store;
      const accessToken = decrypt(credentials[platforms.shopify].accessToken);
      const shopifyService = new ShopifyService(
        credentials[platforms.shopify].storeId,
        accessToken
      );

      const orders = await shopifyService.fetchOrders();

      // Iterate through orders and perform upsert to prevent duplicates
      const upsertPromises = orders.map(async (order: any) => {
        const filter = {
          platform: platforms.shopify,
          platformOrderId: order.id.toString(),
        };
        const update = {
          store: store._id,
          platform: platforms.shopify,
          platformOrderId: order.id.toString(),
          totalPrice: parseFloat(order.total_price),
          currency: order.currency,
          lineItems: order.line_items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            price: parseFloat(item.price),
          })),
        };
        const options = {upsert: true, new: true, setDefaultsOnInsert: true};
        return Order.findOneAndUpdate(filter, update, options);
      });

      await Promise.all(upsertPromises);

      return orders;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }
}

export default ShopifyPlatformService;
