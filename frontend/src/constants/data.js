import {
  FaArrowRight,
  FaArrowUp,
  FaBox,
  FaChartLine,
  FaClipboardList,
  FaCog,
  FaDollarSign,
  FaHome,
  FaHourglassHalf,
  FaUsers,
} from "react-icons/fa";

export const cardData = [
  {
    id: 1,
    title: "Total Vendors",
    value: "5,024",
    icon: <FaUsers className="text-blue-500" size={24} />,
    growth: "8.5% Up from yesterday",
    growthIcon: <FaArrowUp className="text-green-600" />,
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    title: "Total Orders",
    value: "10,293",
    icon: <FaClipboardList className="text-yellow-500" size={24} />,
    growth: "1.3% Up from past week",
    growthIcon: <FaArrowRight className="text-green-600" />,
    bgColor: "bg-yellow-100",
  },
  {
    id: 3,
    title: "Total Revenue",
    value: "$58,430",
    icon: <FaDollarSign className="text-green-500" size={24} />,
    growth: "4.3% Down from yesterday",
    growthIcon: <FaArrowUp className="text-green-600" />,
    bgColor: "bg-green-100",
  },
  {
    id: 4,
    title: "Total GMV",
    value: "742",
    icon: <FaHourglassHalf className="text-red-500" size={24} />,
    growth: "1.8% Up from yesterday",
    growthIcon: <FaArrowRight className="text-red-600" />,
    bgColor: "bg-red-100",
  },
];


export const DUMMY_DATA = {
  allVendors: [
    {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "(123) 456-7890",
      dateJoined: "2021-01-15",
      productUp: 120,
      totalSales: 1230,
    },
    {
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "(987) 654-3210",
      dateJoined: "2022-05-10",
      productUp: 150,
      totalSales: 2230,
    },
    {
      fullName: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "(555) 000-1111",
      dateJoined: "2021-08-25",
      productUp: 95,
      totalSales: 1120,
    },
    {
      fullName: "Bob Brown",
      email: "bob.brown@example.com",
      phone: "(555) 222-3333",
      dateJoined: "2020-11-15",
      productUp: 200,
      totalSales: 3000,
    },
    {
      fullName: "Charlie Black",
      email: "charlie.black@example.com",
      phone: "(555) 444-6666",
      dateJoined: "2023-01-10",
      productUp: 50,
      totalSales: 900,
    },
    {
      fullName: "Daniel White",
      email: "daniel.white@example.com",
      phone: "(555) 111-2222",
      dateJoined: "2022-09-25",
      productUp: 75,
      totalSales: 1300,
    },
    {
      fullName: "Evelyn Harris",
      email: "evelyn.harris@example.com",
      phone: "(555) 333-4444",
      dateJoined: "2022-04-12",
      productUp: 120,
      totalSales: 1700,
    },
    {
      fullName: "Frank Green",
      email: "frank.green@example.com",
      phone: "(555) 555-5555",
      dateJoined: "2021-06-30",
      productUp: 30,
      totalSales: 450,
    },
    {
      fullName: "Grace Lewis",
      email: "grace.lewis@example.com",
      phone: "(555) 666-6666",
      dateJoined: "2023-03-05",
      productUp: 90,
      totalSales: 1500,
    },
  ],
  activeVendors: [
    {
      fullName: "Michael Lee",
      email: "michael.lee@example.com",
      phone: "(555) 111-2222",
      dateJoined: "2021-09-20",
      productUp: 80,
      totalSales: 1530,
    },
    {
      fullName: "Lucy Brown",
      email: "lucy.brown@example.com",
      phone: "(555) 333-4444",
      dateJoined: "2023-02-01",
      productUp: 110,
      totalSales: 1830,
    },
    {
      fullName: "Sophia Davis",
      email: "sophia.davis@example.com",
      phone: "(555) 555-7777",
      dateJoined: "2022-03-15",
      productUp: 60,
      totalSales: 1200,
    },
    {
      fullName: "Ethan Clark",
      email: "ethan.clark@example.com",
      phone: "(555) 777-8888",
      dateJoined: "2022-10-01",
      productUp: 150,
      totalSales: 2300,
    },
    {
      fullName: "Ava Wilson",
      email: "ava.wilson@example.com",
      phone: "(555) 999-0000",
      dateJoined: "2023-05-18",
      productUp: 30,
      totalSales: 500,
    },
    {
      fullName: "Olivia Martin",
      email: "olivia.martin@example.com",
      phone: "(555) 888-2222",
      dateJoined: "2021-11-12",
      productUp: 65,
      totalSales: 850,
    },
    {
      fullName: "Liam Young",
      email: "liam.young@example.com",
      phone: "(555) 444-8888",
      dateJoined: "2022-08-15",
      productUp: 200,
      totalSales: 3500,
    },
    {
      fullName: "Isabella King",
      email: "isabella.king@example.com",
      phone: "(555) 333-1111",
      dateJoined: "2023-04-10",
      productUp: 110,
      totalSales: 2200,
    },
  ],
  suspendedVendors: [
    {
      fullName: "David Wong",
      email: "david.wong@example.com",
      phone: "(555) 666-7777",
      dateJoined: "2022-07-10",
      productUp: 45,
      totalSales: 730,
    },
    {
      fullName: "Mia Thompson",
      email: "mia.thompson@example.com",
      phone: "(555) 888-1111",
      dateJoined: "2022-12-05",
      productUp: 25,
      totalSales: 200,
    },
    {
      fullName: "William Scott",
      email: "william.scott@example.com",
      phone: "(555) 222-5555",
      dateJoined: "2023-01-15",
      productUp: 40,
      totalSales: 500,
    },
    {
      fullName: "Ella Perez",
      email: "ella.perez@example.com",
      phone: "(555) 777-3333",
      dateJoined: "2022-04-20",
      productUp: 15,
      totalSales: 150,
    },
  ],
  awaitingApproval: [
    {
      fullName: "Emma Wilson",
      email: "emma.wilson@example.com",
      phone: "(555) 888-9999",
      dateJoined: "2023-06-22",
      productUp: 5,
      totalSales: 0,
    },
    {
      fullName: "James Taylor",
      email: "james.taylor@example.com",
      phone: "(555) 222-4444",
      dateJoined: "2023-07-15",
      productUp: 10,
      totalSales: 0,
    },
    {
      fullName: "Aiden Martinez",
      email: "aiden.martinez@example.com",
      phone: "(555) 111-8888",
      dateJoined: "2023-08-01",
      productUp: 12,
      totalSales: 0,
    },
    {
      fullName: "Chloe Rodriguez",
      email: "chloe.rodriguez@example.com",
      phone: "(555) 444-9999",
      dateJoined: "2023-08-10",
      productUp: 20,
      totalSales: 0,
    },
  ],
  deletedVendors: [
    {
      fullName: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      phone: "(555) 444-5555",
      dateJoined: "2020-12-15",
      productUp: 0,
      totalSales: 0,
    },
    {
      fullName: "Lucas Anderson",
      email: "lucas.anderson@example.com",
      phone: "(555) 111-0000",
      dateJoined: "2019-03-30",
      productUp: 0,
      totalSales: 0,
    },
    {
      fullName: "Lily Green",
      email: "lily.green@example.com",
      phone: "(555) 222-7777",
      dateJoined: "2019-11-12",
      productUp: 0,
      totalSales: 0,
    },
    {
      fullName: "Jackson Turner",
      email: "jackson.turner@example.com",
      phone: "(555) 333-8888",
      dateJoined: "2020-08-20",
      productUp: 0,
      totalSales: 0,
    },
  ],
};



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
    text: "Vendor",
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
  {
    id: 5,
    url: "analytics", 
    text: "Analytics",
    icon: <FaChartLine />,
  },
  {
    id: 6,
    url: "settings", 
    text: "Settings",
    icon: <FaCog />,
  },
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
  {
    id: 5,
    url: "settings", 
    text: "Settings",
    icon: <FaCog />,
  },
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
  labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Earned',
      data: [20, 60, 45, 80, 55, 120], // Initial data points for Earned
      borderColor: '#fc5185',
      borderWidth: 3,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
    },
    {
      label: 'Sales',
      data: [30, 50, 70, 90, 100, 130], // Initial data points for Sales
      borderColor: '#ffb800',
      borderWidth: 3,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
    },
  ],
};

// Chart data for 1 year time range
export const oneYearChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Earned',
      data: [10, 50, 30, 70, 40, 90, 120, 60, 80, 110, 130, 150], // New data points for Earned
      borderColor: '#fc5185',
      borderWidth: 3,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
    },
    {
      label: 'Sales',
      data: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240], // New data points for Sales
      borderColor: '#ffb800',
      borderWidth: 3,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
    },
  ],
};

// Chart data for 2 years time range
export const twoYearsChartData = {
  labels: ['2022', '2023'],
  datasets: [
    {
      label: 'Earned',
      data: [500, 1200], // Simpler data for 2-year range
      borderColor: '#fc5185',
      borderWidth: 3,
      tension: 0.4,
      fill: false,
      pointRadius: 0,
    },
    {
      label: 'Sales',
      data: [600, 1300], // Simpler data for 2-year range
      borderColor: '#ffb800',
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
