// backend/models/Order.ts
import {model, Schema, Document} from "mongoose";
import collections from "../utils/collections";
import {platforms} from "../utils/constants";

export interface IOrder extends Document {
  store: Schema.Types.ObjectId;
  platform: string; // e.g., 'shopify', 'amazon'
  platformOrderId: string;
  totalPrice: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  lineItems: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

const OrderSchema = new Schema<IOrder>(
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
    platformOrderId: {type: String, required: true, unique: true},
    totalPrice: {type: Number, required: true},
    currency: {type: String, required: true},
    lineItems: [
      {
        name: {type: String, required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true},
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
  }
);

// Create a unique compound index on platform and platformOrderId
OrderSchema.index({platform: 1, platformOrderId: 1}, {unique: true});

export const Order = model<IOrder>(collections.orders, OrderSchema);
