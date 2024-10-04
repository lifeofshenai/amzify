// backend/models/Store.ts

import {model, Schema, Document} from "mongoose";
import collections from "../utils/collections";
import {platforms} from "../utils/constants";

export interface IStorePlatformCredentials {
  storeId: string;
  accessToken: string;
}

export interface IStore extends Document {
  vendor: Schema.Types.ObjectId;
  platforms: string[]; // e.g., ['shopify', 'amazon']
  credentials: {
    [key: string]: IStorePlatformCredentials; // Keyed by platform name
  };
  name: string;
  description: string;
  url: string;
  logo: string;
  isActive: boolean;

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
          type: String,
          enum: Object.values(platforms),
          required: true,
        },
      ],
      default: [],
    },
    credentials: {
      type: Schema.Types.Mixed, // Dynamic keys based on platforms
      default: {},
      select: false,
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
  },
  {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
  }
);

// Example virtual to populate vendor details
StoreSchema.virtual("vendorDetails", {
  ref: collections.users,
  localField: "vendor",
  foreignField: "_id",
  justOne: true,
});

export const Store = model<IStore>(collections.stores, StoreSchema);
