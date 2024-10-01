import {Store, IStore} from "../../models/Store";
import {IUser, User} from "../../models/User";
import ErrorResponse from "../../utils/error";
import {HTTP_STATUS} from "../../utils/constants/statusCodes";
import ShopifyService from "../shopify/ShopifyService";
import {decrypt, encrypt} from "../../utils/encryption";
import {ROLES} from "../../utils/constants";
import mongoose from "mongoose";

class VendorService {
  /**
   * Create a new vendor store
   * @param user -  vendor user
   * @param payload - Vendor details
   */
  async createVendor(payload: IUser & IStore): Promise<IStore> {
    const session = await mongoose.startSession();
    try {
      await session.startTransaction();
      const user = new User({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        role: ROLES.vendor,
        password: "@store123", //TODO auto generate
      });
      // Create Store
      const store = new Store({
        vendor: user._id,
        platforms: payload.platforms, // Array of Platform IDs
        name: payload.name,
        description: payload.description,
        url: payload.url,
        logo: payload.logo,
        shopifyStoreId: payload.shopifyStoreId,
        shopifyAccessToken: encrypt(payload.shopifyAccessToken), // Encrypt access token
      });

      await user.save({session});
      await store.save({session});

      await session.commitTransaction();
      return store;
    } catch (error: any) {
      await session.abortTransaction();
      throw error;
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
        .populate("vendor", "-password") // Exclude password field
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
   * @param id - vendor ID
   */
  async getVendorStore(id: string): Promise<IStore> {
    try {
      const store = await Store.findOne({vendor: id})
        // .populate("vendor", "-password")
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
  async getVendorById(id: string): Promise<IStore> {
    try {
      const store = await Store.findById(id)
        .populate("vendor", "-password")
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
   * Update a vendor store
   * @param id - Store ID
   * @param payload - Updated details
   */
  async updateVendor(id: string, payload: any): Promise<IStore> {
    try {
      const store = await Store.findByIdAndUpdate(id, payload, {new: true})
        .populate("vendor", "-password")
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
   * Synchronize products from Shopify to your database
   * @param storeId - Store ID
   */
  async syncProducts(storeId: string): Promise<any> {
    try {
      const store = await Store.findById(storeId);
      if (!store) {
        throw new ErrorResponse(HTTP_STATUS.NOT_FOUND_404, "Store not found");
      }

      const accessToken = decrypt(store.shopifyAccessToken);
      const shopifyService = new ShopifyService(
        store.shopifyStoreId,
        accessToken
      );

      const products = await shopifyService.fetchProducts();

      // Here, you can choose to store products in your database or process them as needed
      // For simplicity, we'll return the fetched products
      return products;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }

  // Similarly, implement syncOrders if needed
}

export default new VendorService();
