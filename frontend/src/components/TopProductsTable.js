import React from 'react';

const TopProductsTable = () => {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold">Top Performing Products</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow mt-4">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-2 px-4">Product Name</th>
              <th className="py-2 px-4">Brand</th>
              <th className="py-2 px-4">Date Posted</th>
              <th className="py-2 px-4">Stock</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            <tr className="border-b">
              <td className="py-2 px-4">E-Z T-Shirt</td>
              <td className="py-2 px-4">Fashion</td>
              <td className="py-2 px-4">12/12/2024</td>
              <td className="py-2 px-4 text-green-600">In Stock</td>
            </tr>
            {/* Add more rows */}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TopProductsTable;
