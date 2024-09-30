import {body, query} from "express-validator";
import {Platform} from "../../../models/Platform";

const vendorRequirement = {
  validateShopifyAuth: [
    query("storeUrl")
      .isURL()
      .withMessage("Valid store URL is required")
      .notEmpty()
      .withMessage("Store URL cannot be empty"),
  ],
  createVendor: [
    body("firstName").isString().isLength({min: 3}),
    body("lastName").isString().optional({nullable: true}),
    body("email").isEmail(),
    body("platforms")
      .isArray()
      .optional()
      .withMessage("Platforms must be an array of Platform IDs"),
    body("name").notEmpty().withMessage("Store name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("shopifyStoreId")
      .notEmpty()
      .withMessage("Shopify Store ID is required"),
    body("shopifyAccessToken").optional(),
    // Add more validations as needed
  ],
};
export default vendorRequirement;
