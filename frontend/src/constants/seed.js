import {
    FaHome,
    FaClipboardList, 
    FaBox, 
    FaChartLine, 
    FaEnvelope, 
    FaMoneyBillWave, 
    FaCog, 
    User
  } from "react-icons/fa";
  
    
   export const users = [
    {
        name: "John Doe",
        role: "Vendor",
        email: "john.doe@example.com",
        phone: "+123456789",
        profileImage: User,
        socials: {
          facebook: "https://facebook.com/johndoe",
          twitter: "https://twitter.com/johndoe",
          linkedin: "https://linkedin.com/in/johndoe",
          instagram: "https://instagram.com/johndoe",
        },  
      },
        {
            name: "Jane Doe",
            role: "vendor",
            email: "vendor@gmail.com",
            phone: "+123456789",
            profileImage: User,
            socials: {
              facebook: "https://facebook.com/johndoe",
              twitter: "https://twitter.com/johndoe",
              linkedin: "https://linkedin.com/in/johndoe",
              instagram: "https://instagram.com/johndoe",
            },
            },
            {
                name: "John Smith",
                role: "buyer",
                email: "buyer@gmail.com",
                phone: "+123456789",
                profileImage: User,
                socials: {
                  facebook: "https://facebook.com/johndoe",
                  twitter: "https://twitter.com/johndoe",
                  linkedin: "https://linkedin.com/in/johndoe",
                  instagram: "https://instagram.com/johndoe",
                },
        },
   ]
  
  export const links = [
    {
      id: 1,
      url: "/",
      text: "Dashboard",
      icon: <FaHome />,
    },
    {
      id: 1,
      url: "/orders",
      text: "Orders",
      icon: <FaClipboardList />,
    },
    {
      id: 3,
      url: "/products",
      text: "Products",
      icon: <FaBox />,
    },
    {
      id: 4,
      url: "/analytics",
      text: "Analytics",
      icon: <FaChartLine />,
    },
    {
      id: 5,
      url: "/messages",
      text: "Messages",
      icon: <FaEnvelope />,
    },
    {
      id: 6,
      url: "/payment",
      text: "Payment",
      icon: <FaMoneyBillWave />,
    },
    {
      id: 7,
      url: "/settings",
      text: "Settings",
      icon: <FaCog />,
    },
  ];
  
  
  