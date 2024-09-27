export const logTypes = {};

export const otpTypes = {
  resetPassword: "reset-password",
};

export const authLogs = {
  login: "login",
  logout: "logout",
  refresh: "refresh-access",
};
export const empty = ["", null];

export const userRoles = {
  staff: "staff",
  creator: "creator",
  customer: "customer",
  // operator: "operator",
  supplier: "supplier",
  rider: "rider",
};

export const inventoryLocations = {
  kiosk: "kiosk",
  kitchen: "kitchen",
  store: "store",
};

export const inventorySources = {
  supplier: "supplier",
  ...inventoryLocations,
};

export const requestPriorities = {
  moderate: "moderate",
  high: "high",
};

export const requestTypes = {
  prep: "prep",
  material: "material",
  supply: "supply",
};

export const supplyItemStatuses = {
  requested: "requested",
  accepted: "accepted",
  sent: "sent",
  delivered: "delivered",
};

export const requestStatuses = {
  pending: "pending",
  processing: "processing",
  completed: "completed",
};

export const inventoryRequestStatuses = {
  requested: "requested",
  accepted: "accepted",
  sent: "sent",
  received: "received",
};

// export const supplyStatuses = {
//   inprogress: "inprogress",
//   delivered: "delivered",
// };

export const unitOfMeasures = {
  grams: "grams",
  liter: "liter",
  unit: "unit",
  cup: "cup",
  kg: "kg",
  ml: "ml",
};

export const operationOutletTypes = {
  store: "store",
  kiosk: "kiosk",
  prepRoom: "prep-room",
  office: "office",
};

export const locationTypes = {
  kiosk: "kiosk",
  outlet: "outlet",
};

export const locationDepositActions = {
  credit: "credit",
  debit: "debit",
};

export const statuses = {
  active: "active",
  inactive: "inactive",
  blocked: "blocked",
  occupied: "occupied",
  resolved: "resolved",
  pending: "pending",
};

export const otpOptions = {
  sms: "sms",
  email: "email",
};

export const productUpdateTypes = {
  in: "in",
  out: "out",
};

export const userCompensation = {royalty: "royalty", outright: "outright"};

export const orderStatuses = {
  pending: "pending",
  completed: "completed",
  delivered: "delivered",
  processing: "processing",
};

export const subscriptionStatuses = {
  [orderStatuses.pending]: orderStatuses.pending,
  [orderStatuses.processing]: orderStatuses.processing,

  [orderStatuses.completed]: orderStatuses.completed,
};
export const transactionStatuses = {
  success: "success",
  pending: "pending",
  failed: "failed",
  reversed: "reversed",
};

export const payMethods = {
  wallet: "wallet",
  gateway: "gatway",
  bank: "bank-transfer",
  cash: "cash",
  deposite: "bank-deposite",
};

export const transactions = {debit: "debit", credit: "credit"};
export const balances = {balance: "balance", ledger: "ledger"};

export const gateways = {
  paystack: "paystack",
  monnify: "monnify",
  null: null,
};

export const transactionActions = {
  topup: "topup",
  validateOrder: "validateOrder",
  payment: "payment",
  subscription: "subscription",
  invoice: "invoice",
  withdrawal: "withdrawal",
};

export const changeRequestStatuses = {
  pending: "pending",
  inprogress: "inprogress",
  suspended: "suspended",
  completed: "completed",
};

export const icartManagementType = {online: "online", onsite: "onsite"};
export const complaintStatuses = {
  created: "created",
  active: "active",
  closed: "closed",
  resolved: "resolved",
};

export const conceptStatuses = {
  created: "created",
  pending: "pending",
  approved: "approved",
  active: "active",
  inactive: "inactive",
  rejected: "rejected",
};
export const conceptTimetableTypes = {
  prep: "prep",
  distribution: "distribution",
};

export const extraTypes = {
  mixture: "mixture",
  extra: "extra",
};
