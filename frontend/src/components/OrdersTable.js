import React from 'react';

const OrdersTable = () => {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold">Orders</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow mt-4">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-2 px-4">Buyer Name</th>
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Order No.</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            <tr className="border-b">
              <td className="py-2 px-4">Sophia Grey</td>
              <td className="py-2 px-4">E-Z T-Shirt</td>
              <td className="py-2 px-4">#099864</td>
              <td className="py-2 px-4">12/12/2024</td>
              <td className="py-2 px-4">$12.99</td>
              <td className="py-2 px-4 text-yellow-600">Pending</td>
            </tr>
            {/* Add more rows */}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrdersTable;
