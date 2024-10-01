import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Import data from the separate file
import {
  products,
  initialChartData,
  oneYearChartData,
  twoYearsChartData,
} from "../constants/data";

// Register components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

// Options for chart styling
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        boxWidth: 10,
        usePointStyle: true,
        color: '#4A4A4A',
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#4A4A4A',
      },
    },
    y: {
      grid: {
        display: true,
        borderDash: [5, 5],
        color: '#E5E7EB',
      },
      ticks: {
        color: '#4A4A4A',
      },
    },
  },
};

const DashboardStats = () => {
  const [selectedRange, setSelectedRange] = useState('6 months');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dynamic state for chart data
  const [chartData, setChartData] = useState(initialChartData);

  const timeRanges = ['6 months', '1 year', '2 years'];

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    setIsDropdownOpen(false);

    // Update chart data when time range changes
    if (range === '1 year') {
      setChartData(oneYearChartData); // Set to 1 year chart data
    } else if (range === '2 years') {
      setChartData(twoYearsChartData); // Set to 2 years chart data
    } else {
      setChartData(initialChartData); // Reset to 6 months data
    }
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section className="px-4 py-6">
      {/* Main Grid with Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* First Column: Total Sales, Analytics Dropdown, and Line Chart (Takes 2/3 of the space) */}
        <div className="lg:col-span-2 p-6 bg-white rounded-xl shadow-lg relative">
          {/* Total Sales Section */}
          <h2 className="text-3xl lg:text-4xl font-extrabold text-pink-500">$102.5M</h2>
          <p className="text-gray-500 text-lg mt-1">Total Sales (All time)</p>

          {/* Time Range Dropdown for Analytics */}
          <div className="absolute top-0 right-0 p-4">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-pink-600 hover:text-pink-800 focus:outline-none text-sm"
              >
                Analytics &#9662;
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {timeRanges.map((range) => (
                    <li
                      key={range}
                      onClick={() => handleRangeSelect(range)}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-center"
                    >
                      {range}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Line Chart with X (Months) and Y (Money) Axes */}
          <div className="w-full mt-6 flex justify-center">
            <div className="w-full md:w-11/12 lg:w-10/12" style={{ height: '33vh' }}>
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="absolute bottom-4 right-4 text-gray-500 text-sm">{selectedRange}</div>
        </div>

        {/* Second Column: New Products & Featured Product Slider (Takes 1/3 of the space) */}
        <div className="p-6 bg-white rounded-xl shadow-lg">
          {/* New Product Heading */}
          <h2 className="text-xl font-semibold text-white bg-pink-600 p-2 rounded-lg text-center mb-4">
            New Product
          </h2>

          {/* Featured Product Slider */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out my-8"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="min-w-full text-center">
                  <img src={product.image} alt={product.name} className="mx-auto h-24 mb-4" />
                  <h3 className="text-gray-700 font-bold">{product.name}</h3>
                  <p className="text-pink-500">{product.price}</p>
                </div>
              ))}
            </div>

            {/* Previous Slide Button */}
            <button
              onClick={handlePrevSlide}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 text-pink-600 bg-gray-100 hover:bg-gray-200 rounded-full p-2"
            >
              &#9664;
            </button>
            {/* Next Slide Button */}
            <button
              onClick={handleNextSlide}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 text-pink-600 bg-gray-100 hover:bg-gray-200 rounded-full p-2"
            >
              &#9654;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardStats;
