import {
  FaBox,
  FaChartLine,
  FaClipboardList,
  FaHome,
  FaUsers,
} from "react-icons/fa";



export const links = [
  {
    id: 1,
    url: "/admin",
    text: "Dashboard",
    icon: <FaHome />,
  },
  {
    id: 2,
    url: "vendor",
    text: "Vendors",
    icon: <FaUsers />,
  },
  {
    id: 3,
    url: "orders",
    text: "Orders",
    icon: <FaClipboardList />,
  },
  {
    id: 4,
    url: "products",
    text: "Products",
    icon: <FaBox />,
  },
  // {
  //   id: 5,
  //   url: "analytics",
  //   text: "Analytics",
  //   icon: <FaChartLine />,
  // },
  // {
  //   id: 6,
  //   url: "settings",
  //   text: "Settings",
  //   icon: <FaCog />,
  // },
];

export const vendorLinks = [
  {
    id: 1,
    url: "/vendor",
    text: "Dashboard",
    icon: <FaHome />,
  },
  {
    id: 2,
    url: "products",
    text: "Products",
    icon: <FaBox />,
  },
  {
    id: 3,
    url: "orders",
    text: "Orders",
    icon: <FaClipboardList />,
  },
  {
    id: 4,
    url: "analytics",
    text: "Analytics",
    icon: <FaChartLine />,
  },
  // {
  //   id: 5,
  //   url: "settings",
  //   text: "Settings",
  //   icon: <FaCog />,
  // },
];

export const products = [
  {
    id: 1,
    name: "Beats Headphone 2019",
    price: "$89.00",
    image: "https://m.media-amazon.com/images/I/71DGxfKsLzL._AC_SX679_.jpg",
  },
  {
    id: 2,
    name: "Sony WH-1000XM4",
    price: "$299.99",
    image: "https://m.media-amazon.com/images/I/61e4sKblWCL._AC_SX679_.jpg",
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: "$249.99",
    image: "https://m.media-amazon.com/images/I/614U8yyl4uL._AC_SX679_.jpg",
  },
  {
    id: 4,
    name: "Bose QuietComfort 35",
    price: "$329.00",
    image: "https://m.media-amazon.com/images/I/614U8yyl4uL._AC_SX679_.jpg",
  },
];

// Vendor data

// Initial chart data for the line chart
export const initialChartData = {
  labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "Earned",
      data: [20, 60, 45, 80, 55, 120], // Initial data points for Earned
      borderColor: "#fc5185",
      borderWidth: 3,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
    },
    {
      label: "Sales",
      data: [30, 50, 70, 90, 100, 130], // Initial data points for Sales
      borderColor: "#ffb800",
      borderWidth: 3,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
    },
  ],
};

// Chart data for 1 year time range
export const oneYearChartData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Earned",
      data: [10, 50, 30, 70, 40, 90, 120, 60, 80, 110, 130, 150], // New data points for Earned
      borderColor: "#fc5185",
      borderWidth: 3,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
    },
    {
      label: "Sales",
      data: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240], // New data points for Sales
      borderColor: "#ffb800",
      borderWidth: 3,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
    },
  ],
};

// Chart data for 2 years time range
export const twoYearsChartData = {
  labels: ["2022", "2023"],
  datasets: [
    {
      label: "Earned",
      data: [500, 1200], // Simpler data for 2-year range
      borderColor: "#fc5185",
      borderWidth: 3,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
    },
    {
      label: "Sales",
      data: [600, 1300], // Simpler data for 2-year range
      borderColor: "#ffb800",
      borderWidth: 3,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
    },
  ],
};

export const saleSummaryData = {
  totalOrders: 100,
  canceled: 20,
  failedPayment: 10,
  reorder: 50,
  pendingCompleted: {
    pending: 420,
    completed: 3,
  },
};

export const sampleTopProducts = [
  {
    productName: "E-Z T-Shirt",
    description: "Lorem ipsum dolor sit amet",
    brand: "C-Flair",
    datePosted: "2024-07-12", // July
    availability: "In Stock",
  },
  {
    productName: "Raw Core-shirt",
    description: "Lorem ipsum dolor sit amet",
    brand: "BOSS",
    datePosted: "2024-06-06", // June
    availability: "In Stock",
  },
  {
    productName: "Raw Core-shirt",
    description: "Lorem ipsum dolor sit amet",
    brand: "BOSS",
    datePosted: "2024-06-06", // June
    availability: "In Stock",
  },
  {
    productName: "Raw Core-shirt",
    description: "Lorem ipsum dolor sit amet",
    brand: "BOSS",
    datePosted: "2024-06-06", // June
    availability: "In Stock",
  },
  {
    productName: "Blue Polo-shirt",
    description: "Lorem ipsum dolor sit amet",
    brand: "Lacoste",
    datePosted: "2024-07-02", // July
    availability: "In Stock",
  },
  {
    productName: "Black Hoodie",
    description: "Lorem ipsum dolor sit amet",
    brand: "Nike",
    datePosted: "2024-07-04", // July
    availability: "In Stock",
  },
  {
    productName: "Green Slim-shirt",
    description: "Lorem ipsum dolor sit amet",
    brand: "ZARA",
    datePosted: "2024-05-01", // May
    availability: "In Stock",
  },
  {
    productName: "Blue Slim-shirt",
    description: "Lorem ipsum dolor sit amet",
    brand: "ZARA",
    datePosted: "2024-04-15", // April
    availability: "In Stock",
  },
  {
    productName: "Black Slim-shirt",
    description: "Lorem ipsum dolor sit amet",
    brand: "ZARA",
    datePosted: "2024-03-10", // March
    availability: "In Stock",
  },
  {
    productName: "White Slim-shirt",
    description: "Lorem ipsum dolor sit amet",
    brand: "ZARA",
    datePosted: "2024-02-05", // February
    availability: "In Stock",
  },
  {
    productName: "Red Slim-shirt",
    description: "Lorem ipsum dolor sit amet",
    brand: "ZARA",
    datePosted: "2024-01-01", // January
    availability: "In Stock",
  },
];
