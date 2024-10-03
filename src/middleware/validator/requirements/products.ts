import {query} from "express-validator";
import {platforms} from "../../../utils/constants";

const productsRequirement = {
  productsQuery: [
    query("platform").optional().isIn(Object.values(platforms)),
    query("vendorId").optional().isMongoId(),
    query("name").optional().isString().trim(),
    query("priceMin").optional().isFloat({min: 0}),
    query("priceMax").optional().isFloat({min: 0}),
    query("sortBy")
      .optional()
      .isIn(["price", "name", "createdAt", "updatedAt"]),
    query("sortOrder").optional().isIn(["asc", "desc"]),
    query("page").optional().isInt({min: 1}),
    query("limit").optional().isInt({min: 1, max: 100}),
  ],
  ordersQuery: [
    query("platform").optional().isIn(Object.values(platforms)),
    query("vendorId").optional().isMongoId(),
    query("status").optional().isString().trim(),
    query("dateFrom").optional().isISO8601(),
    query("dateTo").optional().isISO8601(),
    query("totalMin").optional().isFloat({min: 0}),
    query("totalMax").optional().isFloat({min: 0}),
    query("sortBy").optional().isIn(["totalPrice", "createdAt", "updatedAt"]),
    query("sortOrder").optional().isIn(["asc", "desc"]),
    query("page").optional().isInt({min: 1}),
    query("limit").optional().isInt({min: 1, max: 100}),
  ],
};

export default productsRequirement;
