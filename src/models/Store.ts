import {model, Schema} from "mongoose";
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
          required: true,
        },
      ],
    },
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

export const Store = model<IStore>(collections.stores, StoreSchema);
