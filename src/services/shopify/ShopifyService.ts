// backend/services/shopify/ShopifyService.ts
import axios, {AxiosInstance} from "axios";
import ErrorResponse from "../../utils/error";
import {HTTP_STATUS} from "../../utils/constants/statusCodes";

class ShopifyService {
  private client: AxiosInstance;

  constructor(shopifyStoreId: string, shopifyAccessToken: string) {
    this.client = axios.create({
      baseURL: `https://${shopifyStoreId}.myshopify.com/admin/api/2023-10/`,
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": shopifyAccessToken,
      },
    });
  }

  /**
   * Fetch products with retry on rate limit
   */
  async fetchProducts(retries = 3): Promise<any> {
    try {
      const response = await this.client.get("products.json", {
        params: {
          limit: 250,
        },
      });
      return response.data.products;
    } catch (error: any) {
      if (error.response && error.response.status === 429 && retries > 0) {
        const retryAfter =
          parseInt(error.response.headers["retry-after"], 10) || 2;
        console.warn(
          `Rate limit exceeded. Retrying after ${retryAfter} seconds...`
        );
        await this.sleep(retryAfter * 1000);
        return this.fetchProducts(retries - 1);
      }
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        `Failed to fetch products from Shopify: ${error.message}`
      );
    }
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Fetch orders from Shopify store
   */
  async fetchOrders(): Promise<any> {
    try {
      const response = await this.client.get("orders.json", {
        params: {
          status: "any",
          financial_status: "paid",
          limit: 250, // Adjust as needed
        },
      });
      return response.data.orders;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        `Failed to fetch orders from Shopify: ${error.message}`
      );
    }
  }
}

export default ShopifyService;
