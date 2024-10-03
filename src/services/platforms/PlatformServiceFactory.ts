// backend/services/platforms/PlatformServiceFactory.ts

import {IPlatformService} from "./IPlatformService";
import ShopifyPlatformService from "./ShopifyService";
import AmazonPlatformService from "./AmazonService"; // To be implemented in Part 2
import {platforms} from "../../utils/constants";

class PlatformServiceFactory {
  static getPlatformService(platform: string): IPlatformService {
    switch (platform) {
      case platforms.shopify:
        return new ShopifyPlatformService();
      case platforms.amazon:
        return new AmazonPlatformService();
      default:
        throw new Error(`Unsupported platform: ${platform}`);
    }
  }
}

export default PlatformServiceFactory;
