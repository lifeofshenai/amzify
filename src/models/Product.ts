import {model, Schema, Document} from "mongoose";
import collections from "../utils/collections";
import {IPlatform} from "./Platform";
import {platform} from "os";
import {platforms} from "../utils/constants";

export interface IProduct extends Document {
  store: Schema.Types.ObjectId;
  platform: Schema.Types.ObjectId;
  platformProductId: string;
  name: string;
  price: number;
  description: string;
  inventory: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    store: {
      type: Schema.Types.ObjectId,
      ref: collections.stores,
      required: true,
    },
    platform: {
      type: String,
      enum: Object.values(platforms),
      required: true,
    },
    price: {type: Number, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    platformProductId: {type: String, required: false},
    inventory: {type: String, required: false},
    image: {type: String, required: false},
  },
  {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
  }
);

// Create a unique compound index on platform and platformProductId
ProductSchema.index({platform: 1, platformProductId: 1}, {unique: true});

export const Product = model<IProduct>(collections.products, ProductSchema);
