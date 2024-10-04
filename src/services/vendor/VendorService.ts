// backend/services/vendor/VendorService.ts

import {Store, IStore} from "../../models/Store";
import {IUser, User} from "../../models/User";
import ErrorResponse from "../../utils/error";
import {HTTP_STATUS} from "../../utils/constants/statusCodes";
import PlatformServiceFactory from "../platforms/PlatformServiceFactory";
import {decrypt, encrypt} from "../../utils/encryption";
import {platforms, ROLES} from "../../utils/constants";
import mongoose from "mongoose";
import {IProduct, Product} from "../../models/Product";
import {IOrder, Order} from "../../models/Order";

class VendorService {
  /**
   * Create a new vendor store with platform credentials
   * @param user - Vendor user
   * @param payload - Vendor details
   */
  async createVendor(
    payload: Partial<IUser> &
      Partial<IStore> & {
        shopifyStoreId: string;
        amazonStoreId: string;
      }
  ): Promise<IStore> {
    const session = await mongoose.startSession();

    try {
      await session.startTransaction();
      const user = new User({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        role: ROLES.vendor,
        password: "@store123", // TODO: Auto-generate or secure password handling
      });

      // Prepare credentials object
      const credentials: {
        [key: string]: {storeId: string; accessToken?: string};
      } = {};

      payload.platforms?.forEach((platform) => {
        if (
          platform === platforms.shopify &&
          payload.shopifyStoreId
          // && payload.shopifyAccessToken
        ) {
          credentials[platform] = {
            storeId: payload.shopifyStoreId,
            // accessToken: encrypt(payload.shopifyAccessToken),
          };
        }
        if (
          platform === platforms.amazon &&
          payload.amazonStoreId
          //  && payload.amazonAccessToken
        ) {
          credentials[platform] = {
            storeId: payload.amazonStoreId,
            // accessToken: encrypt(payload.amazonAccessToken),
          };
        }
      });

      // Create Store
      const store = new Store({
        vendor: user._id,
        platforms: payload.platforms || [],
        credentials,
        name: payload.name,
        description: payload.description,
        url: payload.url,
        logo: payload.logo,
      });

      await user.save({session});
      await store.save({session});

      await session.commitTransaction();
      return store;
    } catch (error: any) {
      await session.abortTransaction();
      throw new ErrorResponse(HTTP_STATUS.BAD_REQUEST_400, error.message);
    } finally {
      await session.endSession();
    }
  }

  /**
   * Retrieve all vendor stores
   */
  async getVendors(): Promise<IStore[]> {
    try {
      const stores = await Store.find()
        .populate("vendorDetails", "-password") // Exclude password field
        .populate("platforms");
      return stores;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }

  /**
   * Retrieve a single store by vendor ID
   * @param id - Vendor ID
   */
  async getVendorStore(id: string, select = ""): Promise<IStore> {
    try {
      const store = await Store.findOne({vendor: id})
        .select(select)
        .populate("platforms");
      if (!store) {
        throw new ErrorResponse(HTTP_STATUS.NOT_FOUND_404, "Vendor not found");
      }
      return store;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }

  /**
   * Retrieve a single vendor store by ID
   * @param id - Store ID
   */
  async getVendorById(id: string, select = ""): Promise<IStore> {
    try {
      const store = await Store.findById(id)
        .select(select)
        .populate("vendorDetails", "-password")
        .populate("platforms");
      if (!store) {
        throw new ErrorResponse(HTTP_STATUS.NOT_FOUND_404, "Vendor not found");
      }
      return store;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }

  /**
   * Update a vendor store's platforms or credentials
   * @param id - Store ID
   * @param payload - Updated details
   */
  async updateVendor(id: string, payload: Partial<IStore>): Promise<IStore> {
    try {
      const store = await Store.findById(id).select("+credentials");
      if (!store) {
        throw new ErrorResponse(HTTP_STATUS.NOT_FOUND_404, "Vendor not found");
      }

      // Update credentials if provided
      if (payload.credentials) {
        Object.keys(payload.credentials).forEach((platform) => {
          if (payload.credentials![platform].accessToken) {
            payload.credentials![platform].accessToken = encrypt(
              payload.credentials![platform].accessToken
            );
          }
        });
      }

      Object.assign(store, payload);
      await store.save();

      return store.populate("vendorDetails");
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }

  async synchronizeData(storeId: string, platformsToSync: string[]) {
    for (const platform of platformsToSync) {
      try {
        const platformService =
          PlatformServiceFactory.getPlatformService(platform);
        await platformService.fetchProducts(storeId);
        await platformService.fetchOrders(storeId);
        // Add more synchronization methods if needed
      } catch (error) {
        console.error(
          `Error synchronizing data for platform ${platform}:`,
          error
        );
        // Handle errors as needed
      }
    }
  }

  async syncProducts(
    storeId: string
  ): Promise<{products: IProduct[]; message: string}> {
    try {
      const store = await Store.findById(storeId).select("+credentials");
      if (!store) {
        throw new ErrorResponse(HTTP_STATUS.NOT_FOUND_404, "Store not found");
      }

      const {platforms, credentials} = store;

      for (const platform of platforms) {
        const platformCredentials = credentials[platform];
        if (platformCredentials) {
          const platformService =
            PlatformServiceFactory.getPlatformService(platform);
          await platformService.fetchProducts(storeId);
        }
      }
      const products = await Product.find({store: storeId});
      return {products, message: "Products synchronized successfully"};
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        `Sync Products error: ${error.message}`
      );
    }
  }

  /**
   * Synchronize orders from all platforms for a store
   * @param storeId - Store ID
   */
  async syncOrders(
    storeId: string
  ): Promise<{orders: IOrder[]; message: string}> {
    try {
      const store = await Store.findById(storeId).select("+credentials");
      if (!store) {
        throw new ErrorResponse(HTTP_STATUS.NOT_FOUND_404, "Store not found");
      }

      const {platforms, credentials} = store;

      for (const platform of platforms) {
        const platformCredentials = credentials[platform];
        if (platformCredentials) {
          const platformService =
            PlatformServiceFactory.getPlatformService(platform);
          await platformService.fetchOrders(storeId);
        }
      }
      const orders = await Order.find({store: storeId});

      return {orders, message: "Orders synchronized successfully"};
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        `Sync Orders error: ${error.message}`
      );
    }
  }

  /**
   * Synchronize payouts from all platforms for a store
   * @param storeId - Store ID
   */
  async fetchPayouts(
    storeId: string
  ): Promise<{payouts: any[]; message: string}> {
    try {
      const store = await Store.findById(storeId).select("+credentials");
      if (!store) {
        throw new ErrorResponse(HTTP_STATUS.NOT_FOUND_404, "Store not found");
      }

      const {platforms, credentials} = store;
      let payouts = [];
      for (const platform of platforms) {
        const platformCredentials = credentials[platform];
        if (platformCredentials) {
          const platformService =
            PlatformServiceFactory.getPlatformService(platform);
          const result = await platformService.fetchPayouts(storeId);
          if (result.length) {
            payouts.push(result);
          }
        }
      }

      return {payouts, message: "Payouts fetched successfully"};
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        `Sync Payouts error: ${error.message}`
      );
    }
  }
  /**
   * Synchronize balances from all platforms for a store
   * @param storeId - Store ID
   */
  async fetchBalances(
    storeId: string
  ): Promise<{balances: any[]; message: string}> {
    try {
      const store = await Store.findById(storeId).select("+credentials");
      if (!store) {
        throw new ErrorResponse(HTTP_STATUS.NOT_FOUND_404, "Store not found");
      }

      const {platforms, credentials} = store;
      let balances = [];
      for (const platform of platforms) {
        const platformCredentials = credentials[platform];
        if (platformCredentials) {
          const platformService =
            PlatformServiceFactory.getPlatformService(platform);
          const result = await platformService.fetchBalance(storeId);
          if (result.length) {
            balances.push(result);
          }
        }
      }

      return {balances, message: "Balance fetched successfully"};
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        `Sync Balance error: ${error.message}`
      );
    }
  }
}

export default new VendorService();
