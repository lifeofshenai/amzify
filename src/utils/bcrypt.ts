import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashed_password = await bcrypt.hash(password, salt);
  return hashed_password;
};
export const comparePassword = async (
  password: string,
  savedPassword: string
) => {
  const isValid = await bcrypt.compare(password, savedPassword);
  return isValid;
};
