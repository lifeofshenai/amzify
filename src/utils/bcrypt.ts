import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSaltSync(10);
  const hashed_password = await bcrypt.hashSync(password, salt);
  return hashed_password;
};
export const comparePassword = async (
  password: string,
  savedPassword: string
) => {
  const isValid = await bcrypt.compareSync(password, savedPassword);
  return isValid;
};
