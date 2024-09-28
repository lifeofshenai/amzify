import {model, Schema} from "mongoose";
import collections from "../utils/collections";

export interface IPlatform extends Document {
  name: string;
  description: string;
  url: string;
  logo: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PlatformSchema = new Schema<IPlatform>(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    url: {type: String, required: false},
    logo: {type: String, required: false},
    isActive: {type: Boolean, default: true},
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const Platform = model<IPlatform>(collections.platforms, PlatformSchema);
