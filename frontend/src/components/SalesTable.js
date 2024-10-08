import { motion } from "framer-motion";
import React from "react";
import { FaCartPlus, FaMoneyBillWave } from "react-icons/fa";

const SalesTable = React.memo(({ topProduct }) => {
  if (
    !topProduct ||
    !topProduct.topProducts ||
    topProduct.topProducts.length === 0
  ) {
   
    return (
      <div className="p-4 text-gray-600">
        No product performance data available.
      </div>
    );
  }

  return (
    <div className="p-2">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="bg-dark-pink font-bold text-white">Product</th>
              <th className="bg-dark-pink font-bold text-white">Sales</th>
              <th className="bg-dark-pink font-bold text-white">Earned</th>
            </tr>
          </thead>
          <tbody>
            {topProduct.topProducts.map((product, index) => (
              <motion.tr
                key={product._id || index}
                whileHover={{ scale: 1.03 }}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-slate-200"
                } hover:bg-gray-100 font-medium`}
              >
                {/* Product Name */}
                <td className="p-4">
                  <div>{product.productName}</div>
                </td>

                {/* Sales Count */}
                <td className="p-4">
                  <FaCartPlus className="inline-block text-green-500 mr-2" />
                  {product.totalQuantity}
                </td>

                {/* Earned Amount */}
                <td className="p-4">
                  <FaMoneyBillWave className="inline-block text-yellow-500 mr-2" />
                  {product.totalSales}$
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default SalesTable;
