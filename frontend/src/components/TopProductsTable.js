// components/TopProductsTable.js
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { sampleTopProducts } from "../constants/data";

const TopProductsTable = () => {
    const [selectedMonth, setSelectedMonth] = useState("July");
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 3; // Set the number of products per page

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        setCurrentPage(1); // Reset to page 1 when month changes
    };

    // Filter the data based on the selected month
    const filteredData = sampleTopProducts.filter((product) => {
        const productMonth = new Date(product.datePosted).toLocaleString("default", {
            month: "long",
        });
        return productMonth === selectedMonth;
    });

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredData.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredData.length / productsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="mt-4">
            {/* Header section with title, "View more" link and dropdown */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h2 className="text-xl font-bold mb-2 md:mb-0">Top Performing Products</h2>
                <div className="flex items-center space-x-4">
                    <a href="/vendor" className="text-pink-700 underline">
                        View more
                    </a>
                    <select
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="bg-gray-100 border border-gray-300 rounded-md py-1 px-3"
                    >
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* Table Head */}
                    <thead className="bg-pink-700 text-white">
                        <tr>
                            <th className="py-2 px-4 text-left text-sm font-medium">Product name</th>
                            <th className="py-2 px-4 text-left text-sm font-medium">Description</th>
                            <th className="py-2 px-4 text-left text-sm font-medium">Brand</th>
                            <th className="py-2 px-4 text-left text-sm font-medium">Date Posted</th>
                            <th className="py-2 px-4 text-left text-sm font-medium">Availability</th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product, index) => (
                                <tr key={index} className="hover:bg-pink-100">
                                    {/* Product Name */}
                                    <td className="p-4 text-sm">{product.productName}</td>

                                    {/* Description */}
                                    <td className="p-4 text-sm">
                                        {product.description || "Lorem ipsum dolor sit..."}
                                    </td>

                                    {/* Brand */}
                                    <td className="p-4 text-sm flex items-center">
                                        {product.brand}
                                        <FaCheckCircle className="text-green-500 ml-2" />
                                    </td>

                                    {/* Date Posted */}
                                    <td className="p-4 text-sm">{product.datePosted}</td>

                                    {/* Availability */}
                                    <td className="p-4 text-sm flex items-center">
                                        {product.availability}
                                        <FaCheckCircle className="text-green-500 ml-2" />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-sm">
                                    No products available for {selectedMonth}.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {filteredData.length > productsPerPage && (
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                    >
                        Previous
                    </button>
                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default TopProductsTable;
