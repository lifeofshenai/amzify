import AppConfig from "../config/appConfig";
import mongoose from "mongoose";
import Logger from "../middleware/morgan/logger";

const connectDB = () => {
  mongoose.set("strictQuery", false);
  mongoose.set("strictPopulate", false);
  mongoose
    .connect(AppConfig.db.mongo_url)
    .then((conn) => {
      Logger.debug(`Database connected:${conn.connection.host}`);
    })
    .catch((err) => {
      Logger.error(err);
    });
};

export default connectDB;
