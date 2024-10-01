import {model, Schema, Document} from "mongoose";
import collections from "../utils/collections";
import {IPlatform} from "./Platform";

export interface IStore extends Document {
  vendor: Schema.Types.ObjectId;
  platforms: Schema.Types.ObjectId[] | IPlatform[];
  name: string;
  description: string;
  url: string;
  logo: string;
  isActive: boolean;
  shopifyStoreId: string;
  amazonStoreId: string;
  shopifyAccessToken: string;
  amazonAccessToken: string;

  createdAt: Date;
  updatedAt: Date;
}

const StoreSchema = new Schema<IStore>(
  {
    vendor: {
      type: Schema.Types.ObjectId,
      ref: collections.users,
      required: true,
    },
    platforms: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: collections.platforms,
          required: false,
        },
      ],
      default: [],
    },
    name: {type: String, required: true},
    description: {type: String, required: true},
    url: {type: String, required: false},
    logo: {
      type: String,
      required: false,
      default:
        "https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png",
    },
    isActive: {type: Boolean, default: true},
    shopifyStoreId: {type: String, required: true},
    shopifyAccessToken: {type: String, required: false, select: false},
    amazonStoreId: {type: String, required: true},
    amazonAccessToken: {type: String, required: false, select: false},
  },
  {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
  }
);

export const Store = model<IStore>(collections.stores, StoreSchema);
