import React, { useEffect, useState } from 'react';
import {saleSummaryData} from '../constants/data';

const SaleSummary = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulating an API call
    const fetchData = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(saleSummaryData);
        }, 1000); // Simulate a 1 second API call
      });
    };

    fetchData().then((fetchedData) => setData(fetchedData));
  }, []);

  // Get today's date
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  if (!data) {
    return <div className="text-center">Loading...</div>; // Loading state
  }

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold">{formattedDate} Summary</h2>
      <div className="overflow-x-auto bg-pink-100 rounded-lg shadow mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4">
          <div className="text-center">
            <h3 className="text-gray-700">Total Orders</h3>
            <span className="text-2xl font-bold block text-black">{data.totalOrders}</span>
          </div>
          <div className="text-center">
            <h3 className="text-gray-700">Canceled</h3>
            <span className="text-2xl font-bold block text-black">{data.canceled}</span>
          </div>
          <div className="text-center">
            <h3 className="text-gray-700">Failed Payment</h3>
            <span className="text-2xl font-bold block text-black">{data.failedPayment}</span>
          </div>
          <div className="text-center">
            <h3 className="text-gray-700">Re-order</h3>
            <span className="text-2xl font-bold block text-black">{data.reorder}</span>
          </div>
          <div className="text-center">
            <h3 className="text-gray-700">Pending/Completed</h3>
            <span className="text-2xl font-bold block text-black">
              {data.pendingCompleted.pending}/{data.pendingCompleted.completed}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleSummary;
