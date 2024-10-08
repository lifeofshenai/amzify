import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import axiosInstance from "../services/instantAxios";

const ProductRow = React.memo(({ product, index }) => {
  const getInventoryBadge = (inventory) => {
    if (inventory > 10) {
      return (
        <span className="badge badge-success text-xs text-white font-medium p-3">
          In Stock
        </span>
      );
    } else if (inventory <= 10 && inventory > 0) {
      return (
        <span className="badge badge-warning text-xs text-white font-medium p-3">
          Low Stock
        </span>
      );
    } else {
      return (
        <span className="badge badge-error text-xs text-white font-medium p-3">
          Out of Stock
        </span>
      );
    }
  };

  return (
    <motion.tr
      key={product._id}
      whileHover={{ scale: 1.02, backgroundColor: "#f7f7f7" }}
      className={`${
        index % 2 === 0 ? "bg-white" : "bg-slate-200"
      } rounded-lg shadow-lg font-medium transition duration-300`}
    >
      <td className="p-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-12 h-12 object-cover rounded-full shadow-sm"
        />
      </td>
      <td className="p-3 font-medium text-sm ">
        {product.platformProductId}
      </td>
      <td className="p-3 font-medium text-sm ">
        {product.store.name}
      </td>
      <td className="p-3 font-medium text-sm ">
        {product.platform}
      </td>
      <td className="p-3 font-medium text-sm">
        {getInventoryBadge(product.inventory)}
      </td>
      <td className="p-3 font-medium text-sm">
        {product.name}
      </td>
      <td className="p-3 font-medium text-sm">
        ${product.price}
      </td>
    </motion.tr>
  );
});


const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [meta, setMeta] = useState({
    pages: 1,
    total: 0,
    pageNumber: 1,
  });

  const fetchProducts = useCallback(async (currentPage, currentPageSize) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/products?page=${currentPage}&limit=${currentPageSize}`
      );

      const fetchedProducts = response.data.data.products || [];
      const pagination = response.data.data.pagination || {
        pages: 1,
        total: 0,
        pageSize: currentPageSize,
        pageNumber: currentPage,
      };

      setProducts(fetchedProducts);
      setMeta(pagination);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(page, pageSize);
    
  }, [page, pageSize, fetchProducts]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="grid place-items-center h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  const handleNextPage = () => {
    if (page < meta.pages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setPage(1);
  };

  return (
    <div className="w-full bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-dark-pink">Product List</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="pageSize" className="mr-2 font-semibold">
            Items per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="border border-gray-300 rounded p-1 input-sm font-medium text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <motion.table
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="table w-full bg-white"
        >
          <thead>
            <tr className="text-left text-white bg-dark-pink">
              <th className="p-3">Image</th>
              <th className="p-3">Product ID</th>
              <th className="p-3">Store</th>
              <th className="p-3">Platform</th>
              <th className="p-3">Inventory</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.map((product, index) => (
              <ProductRow key={product._id} product={product} index={index} />
            ))}
          </tbody>
        </motion.table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          className={`px-4 py-2 rounded-lg ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-sm">
          Page {meta.pageNumber} of {meta.pages}
        </span>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 rounded-lg ${
            page === meta.totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={page === meta.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
