import mainRequirement from "./main";
import vendorRequirement from "./vendor";
import usersRequirement from "./users";

export default {
  ...mainRequirement,
  ...vendorRequirement,
  ...usersRequirement,
};
