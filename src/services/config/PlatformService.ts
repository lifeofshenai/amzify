import {Platform, IPlatform} from "../../models/Platform";
import ErrorResponse from "../../utils/error";
import {HTTP_STATUS} from "../../utils/constants/statusCodes";

class PlatformService {
  /**
   * Create a new platform store
   * @param payload - Platform details
   */
  async createPlatform(payload: IPlatform): Promise<IPlatform> {
    try {
      const platform = new Platform(payload);
      await platform.save();

      return platform;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Retrieve all platform
   */
  async getPlatforms(): Promise<IPlatform[]> {
    try {
      const platforms = await Platform.find();

      return platforms;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }

  /**
   * Retrieve a single platform store by ID
   * @param id - Platform ID
   */
  async getPlatformById(id: string): Promise<IPlatform> {
    try {
      const store = await Platform.findById(id);
      if (!store) {
        throw new ErrorResponse(
          HTTP_STATUS.NOT_FOUND_404,
          "Platform not found"
        );
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
   * Update a platform store
   * @param id - Platform ID
   * @param payload - Updated details
   */
  async updatePlatform(id: string, payload: any): Promise<IPlatform> {
    try {
      const store = await Platform.findByIdAndUpdate(id, payload, {new: true});
      if (!store) {
        throw new ErrorResponse(
          HTTP_STATUS.NOT_FOUND_404,
          "Platform not found"
        );
      }
      return store;
    } catch (error: any) {
      throw new ErrorResponse(
        HTTP_STATUS.INTERNAL_SERVER_ERROR_500,
        error.message
      );
    }
  }
}

export default new PlatformService();
