import {
  FaHome,
  FaUsers,
  FaClipboardList,
  FaBox,
  FaChartLine,
  FaEnvelope,
  FaMoneyBillWave,
  FaCog,
  FaArrowUp,
  FaArrowRight,
  FaDollarSign,
  FaHourglassHalf,

} from "react-icons/fa";


export const cardData = [
  {
    id: 1,
    title: "Total Users",
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
    title: "Total Sales",
    value: "$58,430",
    icon: <FaDollarSign className="text-green-500" size={24} />,
    growth: "4.3% Down from yesterday",
    growthIcon: <FaArrowUp className="text-green-600" />,
    bgColor: "bg-green-100",
  },
  {
    id: 4,
    title: "Total Pending",
    value: "742",
    icon: <FaHourglassHalf className="text-red-500" size={24} />,
    growth: "1.8% Up from yesterday",
    growthIcon: <FaArrowRight className="text-red-600" />,
    bgColor: "bg-red-100",
  },
];


 export const user = {
   name: "John Doe",
   role: "Admin",
   email: "john.doe@example.com",
   phone: "+123456789",
   profileImage: '../assets/Passport.png',
   socials: {
     facebook: "https://facebook.com/johndoe",
     twitter: "https://twitter.com/johndoe",
     linkedin: "https://linkedin.com/in/johndoe",
     instagram: "https://instagram.com/johndoe",
   },
 };

export const links = [
  {
    id: 1,
    url: "/",
    text: "Dashboard",
    icon: <FaHome />,
  },
  {
    id: 2,
    url: "/vendor",
    text: "Vendor",
    icon: <FaUsers />, // Assuming this represents vendors
  },
  {
    id: 3,
    url: "/customers",
    text: "Customers",
    icon: <FaUsers />, // Assuming this represents customers
  },
  {
    id: 4,
    url: "/orders",
    text: "Orders",
    icon: <FaClipboardList />,
  },
  {
    id: 5,
    url: "/products",
    text: "Products",
    icon: <FaBox />,
  },
  {
    id: 6,
    url: "/analytics",
    text: "Analytics",
    icon: <FaChartLine />,
  },
  {
    id: 7,
    url: "/messages",
    text: "Messages",
    icon: <FaEnvelope />,
  },
  {
    id: 8,
    url: "/payment",
    text: "Payment",
    icon: <FaMoneyBillWave />,
  },
  {
    id: 9,
    url: "/manage",
    text: "Manage",
    icon: <FaCog />,
  },
  {
    id: 10,
    url: "/settings",
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


