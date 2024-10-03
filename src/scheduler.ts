import cron from "node-cron";
import VendorService from "./services/vendor/VendorService";
import {Store} from "./models/Store";
import Logger from "./middleware/morgan/logger";

// Schedule to run every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    Logger.info("Starting daily Shopify data synchronization");
    const stores = await Store.find({isActive: true});

    for (const store of stores) {
      await VendorService.syncProducts(store.id);
      await VendorService.fetchOrders(store.id);
      Logger.info(`Synchronized data for store: ${store.name}`);
    }

    Logger.info("Completed daily Shopify data synchronization");
  } catch (error: any) {
    Logger.error(`Error during synchronization: ${error.message}`);
  }
});
