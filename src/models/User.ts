import {Schema, model, Document} from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import appConfig from "../config/appConfig";
import {ROLES} from "../utils/constants";
import collections from "../utils/collections";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phoneNumber: string;
  password: string;
  pictureUrl: string;
  deviceToken?: string;
  isActive: boolean;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;

  resetPasswordToken: string;
  resetPasswordExpire: string;

  getSignedJwtToken(): string;
  matchPassword(password: string): Promise<boolean>;
  getResetPasswordToken(): Promise<string>;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    pictureUrl: {type: String, required: false},
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Enter a valid email address",
      ],
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      required: [true, "Role is required"],
    },
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
      minlength: [8, "password must be at least 8 character"],
    },
    phoneNumber: {type: String, required: true},
    deviceToken: {type: String},

    isActive: {type: Boolean, default: true},

    lastLogin: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    resetPasswordToken: String,
    resetPasswordExpire: Date,
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

UserSchema.index({email: 1, phoneNumber: 1});

// Pre-save hook to hash password and transactionPin
UserSchema.pre<IUser>("save", async function (next: any) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(appConfig.app.hashSalt);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (err) {
    next(err);
  }
});

// Sign in JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      pictureUrl: this.pictureUrl,
      email: this.email,
      role: this.role,
      phoneNumber: this.phoneNumber,
    },
    appConfig.app.secret,
    {
      expiresIn: appConfig.app.jwtExpire,
    }
  );
};

UserSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// Generate and hash password reset token
UserSchema.methods.getResetPasswordToken = async function (): Promise<string> {
  // generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
export const User = model<IUser>(collections.users, UserSchema);
