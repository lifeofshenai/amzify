import CryptoJS from "crypto-js";
import appConfig from "../config/appConfig";

export const encrypt = (text: string): string => {
  return CryptoJS.AES.encrypt(text, appConfig.app.secret).toString();
};

export const decrypt = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, appConfig.app.secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};
