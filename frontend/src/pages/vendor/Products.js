import { Link } from 'react-router-dom'

import { Button } from "./Button";
import { Card } from "./Card";
import { Table, TableBody, TableCell, TableHead, TableRow } from "./Table";

export default function ProductManagement() {
  const products = [
    { name: "E-Z T-Shirt", desc: "Lorem ipsum dolor sit...", brand: "C-Flair", date: "12/12/2024", availability: "In Stock", action: "Boosted" },
    { name: "Green Slim-shirt", desc: "Lorem ipsum dolor sit...", brand: "ZORO", date: "12/12/2024", availability: "In Stock", action: "Boost" }
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-700">Product Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="col-span-2 p-4">
  <div className="grid grid-cols-3">
    <h2 className="text-lg font-semibold col-start-1 row-start-1">Best Selling Product</h2>
    <div className="flex flex-col items-center justify-center col-span-1 col-start-2 row-span-2">
      <img 
        src="https://m.media-amazon.com/images/I/614U8yyl4uL._AC_SX679_.jpg" 
        alt="Best selling product" 
        className="w-24 h-24 object-cover mb-2" 
      />
      <p className="text-lg font-bold">$Price</p> {/* Add the price here */}
      <p className="text-2xl font-bold">1,920</p>
      <p className="text-sm text-gray-500">Total Sales</p>
    </div>
    <h3 className="font-semibold col-start-1 row-start-2 self-end">E-Z T-Shirt</h3>
    <p className="text-sm text-gray-500 col-start-3 row-start-2 self-end text-right">Posted: 14/7/2024</p>
  </div>
</Card>
        <div className="space-y-2">
          <Button className="w-full" variant="default">
            <Link to="/vendor/products/add">Add New Product</Link>
          </Button>
          <Button className="w-full" variant="orange">Drafts</Button>
          <Button className="w-full" variant="gray">Best Seller Runner Up</Button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Top Performing Products</h2>
          <div className="flex items-center space-x-2">
            <span className="text-pink-500">View more</span>
            <select className="border rounded p-1">
              <option>Avg</option>
            </select>
          </div>
        </div>

        <Table>
          <thead>
            <TableRow>
              <TableHead>Product name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Date Posted</TableHead>
              <TableHead>Availability</TableHead>
            </TableRow>
          </thead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index} className="bg-pink-500 text-white">
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.desc}</TableCell>
                <TableCell>{product.brand} ✅</TableCell>
                <TableCell>{product.date}</TableCell>
                <TableCell>{product.availability}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">My Products</h2>
          <div className="flex items-center space-x-2">
            <span className="text-pink-500">View more</span>
            <select className="border rounded p-1">
              <option>Performance</option>
            </select>
          </div>
        </div>

        <Table>
          <thead>
            <TableRow>
              <TableHead>Product name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Date Posted</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </thead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.desc}</TableCell>
                <TableCell>{product.brand} ✅</TableCell>
                <TableCell>{product.date}</TableCell>
                <TableCell>{product.availability}</TableCell>
                <TableCell>
                  <Button
                    variant={product.action === "Boosted" ? "outline" : "default"}
                    className={product.action === "Boosted" ? "bg-gray-200 text-gray-700" : "bg-pink-500 hover:bg-pink-600"}
                  >
                    {product.action}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
