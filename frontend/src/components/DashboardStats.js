import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Dummy product data for the slider
const featuredProducts = [
  {
    id: 1,
    name: 'E-Z T-Shirt',
    price: '$89.00',
    image: '/logo192.png'
  },
  {
    id: 2,
    name: 'Geeks Hoodie',
    price: '$59.00',
    image: '/logo192.png'
  },
  {
    id: 3,
    name: 'Sport Shoes',
    price: '$120.00',
    image: '/admin.jpg'
  },
];

// Dummy data for the line chart
const data = [
  { month: 'Feb', earned: 10, sales: 20 },
  { month: 'Mar', earned: 50, sales: 40 },
  { month: 'Apr', earned: 30, sales: 60 },
  { month: 'May', earned: 70, sales: 80 },
  { month: 'Jun', earned: 40, sales: 90 },
  { month: 'Jul', earned: 100, sales: 110 },
];

const DashboardStats = () => {
  const [selectedRange, setSelectedRange] = useState('6 months');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const timeRanges = ['6 months', '1 year', '2 years'];

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    setIsDropdownOpen(false);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  return (
    <section className="px-4 py-6">
      {/* Main Grid with Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* First Column: Total Sales, Analytics Dropdown, and Line Chart */}
        <div className="p-6 bg-white rounded-xl shadow-lg relative">
          <h2 className="text-3xl font-bold text-pink-600">$102.5M</h2>
          <p className="text-gray-500 mt-1">Total Sales (All time)</p>

          {/* Time Range Dropdown for Analytics */}
          <div className="absolute top-0 right-0 p-4">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-pink-500 hover:text-pink-700 focus:outline-none"
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
          <div className="w-full mt-6 h-40 relative">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                {/* Pink Line */}
                <Line
                  type="monotone"
                  dataKey="earned"
                  stroke="#fc5185"
                  strokeWidth={2}
                  isAnimationActive={true}
                  animationDuration={2000}
                  animationBegin={0}
                  animationEasing="ease-in-out"
                />
                {/* Yellow Line */}
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#ffb800"
                  strokeWidth={2}
                  isAnimationActive={true}
                  animationDuration={2000}
                  animationBegin={500}
                  animationEasing="ease-in-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="absolute bottom-4 right-4 text-gray-500">
            {selectedRange}
          </div>
        </div>

        {/* Second Column: New Products & Featured Product Slider */}
        <div className="p-6 bg-white rounded-xl shadow-lg">
          {/* New Product Heading */}
          <h2 className="text-xl font-semibold text-white bg-pink-600 p-2 rounded-lg text-center mb-4">
            New Product
          </h2>

          {/* Featured Product Slider */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="min-w-full flex flex-col items-center justify-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-contain"
                  />
                  <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                  <p className="text-pink-600 font-semibold">{product.price}</p>
                </div>
              ))}
            </div>
            {/* Previous Slide Button */}
            <button
              onClick={handlePrevSlide}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-pink-600 text-white rounded-full p-2 hover:bg-pink-700"
            >
              &#9664;
            </button>
            {/* Next Slide Button */}
            <button
              onClick={handleNextSlide}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-pink-600 text-white rounded-full p-2 hover:bg-pink-700"
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
