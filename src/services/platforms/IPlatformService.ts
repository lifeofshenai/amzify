export interface IPlatformService {
  fetchProducts(storeId: string): Promise<any[]>;
  fetchOrders(storeId: string): Promise<any[]>;
  fetchPayouts(storeId: string): Promise<any[]>;
  fetchBalance(storeId: string): Promise<any[]>;

  // Add more methods as needed, e.g., syncProducts, syncOrders, etc.
}
