import {
  FaHome,
  FaUsers, 
  FaClipboardList, 
  FaBox, 
  FaChartLine, 
  FaEnvelope, 
  FaMoneyBillWave, 
  FaCog, 
} from "react-icons/fa";

  const userimg = '../assets/admin.jpg';
  
 export const user = {
   name: "John Doe",
   role: "Admin",
   email: "john.doe@example.com",
   phone: "+123456789",
   profileImage: userimg,
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


