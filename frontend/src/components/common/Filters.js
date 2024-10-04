import React, {useState, useContext} from "react";
import {AnalyticsContext} from "../../context/AnalyticsContext";

const Filters = () => {
  const [platform, setPlatform] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const {fetchAnalytics} = useContext(AnalyticsContext);

  const handleFilter = () => {
    const params = {};
    if (platform) params.platform = platform;
    if (dateFrom) params.dateFrom = dateFrom;
    if (dateTo) params.dateTo = dateTo;

    const queryString = new URLSearchParams(params).toString();
    fetchAnalytics(queryString);
  };

  return (
    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Platform
        </label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">All</option>
          <option value="shopify">Shopify</option>
          <option value="amazon">Amazon</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Date From
        </label>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Date To
        </label>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="flex items-end">
        <button
          onClick={handleFilter}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
