import {model, Schema} from "mongoose";
import collections from "../utils/collections";

export interface ISettings extends Document {
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    key: {type: String, required: true},
    value: {type: String, required: true},
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

export const Settings = model<ISettings>(collections.settings, SettingsSchema);
