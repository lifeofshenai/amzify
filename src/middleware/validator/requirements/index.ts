import mainRequirement from "./main";
import vendorRequirement from "./vendor";
import usersRequirement from "./users";
import productsRequirement from "./products";

export default {
  ...mainRequirement,
  ...vendorRequirement,
  ...usersRequirement,
  ...productsRequirement,
};
