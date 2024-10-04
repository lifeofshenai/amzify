export type LoginType = {
  email: string;
  password: string;
  deviceToken?: string;
};
export type SignUpType = {
  email: string;
  phoneNumber?: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive?: boolean;
};
