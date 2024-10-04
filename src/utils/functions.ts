export const regExSearch = (q: string) => ({$regex: new RegExp(q, "i")});
export const selectFromObject = (fields = [], obj: any) => {
  const output: any = {};
  fields.forEach((f) => {
    output[f] = obj[f];
  });
  return output;
};
export const excludeFromObject = (fields = [], obj: any) => {
  const output: any = {};
  Object.keys(obj).forEach((f: any) => {
    if (!fields.includes(f as never)) {
      output[f] = obj[f];
    }
  });
  return output;
};
export function generateOTP(length = 5) {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

export function paginate(totalCount = 0, limit: number, pageNumber: number) {
  pageNumber = Number(pageNumber);
  limit = Number(limit);
  const allPages = Math.ceil(totalCount / limit);
  let paginate = {pageNumber, pages: 0, prev: 0, next: 0, total: totalCount};
  paginate.pages = allPages;
  paginate.total = totalCount;

  if (pageNumber > 1) paginate.prev = pageNumber - 1;
  if (pageNumber < allPages) paginate.next = pageNumber + 1;

  return paginate;
}

export function secondsToMidnight(date: any = new Date()) {
  // Get the next day's midnight
  const midnight: any = new Date(date);
  midnight.setHours(24, 0, 0, 0); // Set the time to midnight of the next day

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = midnight - date;

  // Convert milliseconds to seconds
  const secondsToMidnight = Math.floor(differenceInMilliseconds / 1000);

  return secondsToMidnight;
}


/**
 * Helper functions to map Amazon statuses to your defined statuses
 */
function mapAmazonFinancialStatus(paymentDetails: any): string {
  // Implement mapping based on Amazon's API response
  // Example:
  if (paymentDetails.Paid) return 'paid';
  if (paymentDetails.Pending) return 'pending';
  // Add more conditions as per Amazon's data
  return 'pending';
}

function mapAmazonFulfillmentStatus(fulfillmentChannel: string): string {
  // Implement mapping based on Amazon's API response
  // Example:
  if (fulfillmentChannel === 'AFN') return 'fulfilled';
  if (fulfillmentChannel === 'MFN') return 'unfulfilled';
  // Add more conditions as per Amazon's data
  return 'unfulfilled';
}