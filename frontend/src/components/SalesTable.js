import React from "react";

// Data for the table
const tableData = [
  { category: "Shirts", price: 450, units: 1200, data: 80 },
  { category: "Skirts", price: 420, units: 1100, data: 70 },
  { category: "Accessories", price: 380, units: 1056, data: 65 },
  { category: "Beauty", price: 350, units: 987, data: 50 },
  { category: "Skin Care", price: 324, units: 900, data: 40 },
];

const SalesTable = () => {
  return (
    <div className="w-full bg-white p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Table title</h2>
        <a href="#" className="text-pink-500 hover:underline">
          See details &rarr;
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="pb-2">Category</th>
              <th className="pb-2">Av. Price</th>
              <th className="pb-2">Units</th>
              <th className="pb-2">Data</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index} className="border-t text-gray-700">
                <td className="py-2">{item.category}</td>
                <td className="py-2">${item.price}</td>
                <td className="py-2">{item.units}</td>
                <td className="py-2">
                  <div className="w-full h-3 bg-pink-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-pink-500"
                      style={{ width: `${item.data}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;
