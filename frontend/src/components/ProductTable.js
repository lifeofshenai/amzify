import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import axiosInstance from "../services/instantAxios";

const ProductRow = React.memo(({ product }) => (
  <motion.tr
    key={product._id}
    whileHover={{ scale: 1.02, backgroundColor: "#f7f7f7" }}
    className="bg-white border-b border-gray-300 transition duration-300"
  >
    <td className="p-3">
      <img
        src={product.image}
        alt={product.name}
        className="w-12 h-12 object-cover rounded-full shadow-sm"
      />
    </td>
    <td className="p-3 font-medium text-sm text-blue-600">
      {product.store.name}
    </td>
    <td className="p-3 font-medium text-sm text-green-600">
      {product.platform}
    </td>
    <td className="p-3 font-medium text-sm text-red-500">
      {product.inventory}
    </td>
    <td className="p-3 font-medium text-sm text-indigo-600">{product.name}</td>
    <td className="p-3 font-medium text-sm text-teal-500">${product.price}</td>
    <td className="p-3 font-medium text-sm text-pink-500">
      {product.platformProductId}
    </td>
  </motion.tr>
));

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // State for dynamic page size
  const [pageSize, setPageSize] = useState(5); // Default is 5 items per page

  const [meta, setMeta] = useState({
    totalPages: 1,
    total: 0,
    pageNumber: 1,
  });

  // Fetch products with proper pagination meta and dynamic page size
  const fetchProducts = useCallback(async (currentPage, currentPageSize) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/products?page=${currentPage}&limit=${currentPageSize}`
      );

      const fetchedProducts = response.data.data.products || [];
      const pagination = response.data.data.pagination || {
        totalPages: 1,
        total: 0,
        pageSize: currentPageSize,
        pageNumber: currentPage,
      };

      setProducts(fetchedProducts);
      setMeta(pagination); // Set pagination data
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
      setLoading(false);
    }
  }, []);

  // Re-fetch products when page or pageSize changes
  useEffect(() => {
    fetchProducts(page, pageSize);
  }, [page, pageSize, fetchProducts]);

  // Handle the loading spinner
  if (loading) {
    return <LoadingSpinner />;
  }

  // Handle errors
  if (error) {
    return (
      <div className="grid place-items-center h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  // Pagination button handlers
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

  // Handle pageSize change
  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize); // Update page size
    setPage(1); // Reset to page 1 when pageSize changes
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Product List</h2>
        <span className="text-pink-500 hover:underline cursor-pointer">
          See details &rarr;
        </span>
      </div>

      <div className="flex justify-between items-center mb-4">
        {/* Page size selector */}
        <div>
          <label htmlFor="pageSize" className="mr-2">
            Items per page:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="border border-gray-300 rounded p-2"
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
          className="w-full table-auto bg-white"
        >
          <thead>
            <tr className="text-left text-gray-500 bg-neutral-200 border-b-2 border-gray-300">
              <th className="p-3">Image</th>
              <th className="p-3">Store</th>
              <th className="p-3">Platform</th>
              <th className="p-3">Inventory</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Product ID</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.map((product) => (
              <ProductRow key={product._id} product={product} />
            ))}
          </tbody>
        </motion.table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          className={`px-4 py-2 rounded-md ${
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
          className={`px-4 py-2 rounded-md ${
            page === meta.pages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={page === meta.pages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
