const AppConfig = {
  app: {
    name: process.env.APP_NAME,
    server: process.env.SERVER,
    isDevelopment: ["development", "dev", "local"].includes(
      <string>process.env.SERVER
    ),
    port: parseInt(<string>process.env.PORT, 10) || 4000,
    apiVersion: process.env.API_VERSION || 1,
    secret: process.env.SECRET || "j!89nKO5as&Js",
    tempSecret: process.env.TEMP_SECRET || "dlu93hccu!&Hg0",
    hashSalt: parseInt(<string>process.env.HASH_SALT, 10) || 10,
    jwtExpire: process.env.JWT_EXPIRE || "1d",
    maxFileSize: parseInt(<string>process.env.MAX_FILE_UPLOAD, 10),
  },
  aws: {
    awsKey: process.env.AWS_ACCESS_KEY_ID,
    awsSecret: process.env.AWS_SECRET_ACCESS_KEY as string,
    awsBucket: process.env.S3_BUCKET,
    awsRegion: process.env.S3_REGION,
  },
  db: {
    mongo_url: process.env.MONGO_URL || "",
  },

  paystack: {
    baseUrl: process.env.PAYSTACK_URL || "",
    secretKey: process.env.PAYSTACK_SECRET_KEY,
    publicKey: process.env.PAYSTACK_PUBLIC_KEY,
  },
  paymentChannel: "paystack",
  walletFundCharge: 20,
  withdrawalCharge: 20,
  nodemailer: {
    service: process.env.SMTP_SERVICE,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
    fromName: process.env.FROM_NAME,
    fromEmail: process.env.FROM_EMAIL,
  },
  checkId: {
    baseUrl: process.env.CHECK_ID_URL,
    token: process.env.CHECK_ID_TOKEN,
  },
  defaultCommissionFee: 2,
};

export default Object.freeze(AppConfig);
