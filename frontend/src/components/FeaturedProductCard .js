import "daisyui";
import React from "react";
import { products } from "../constants/data";


const FeaturedProductCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center">
      <h2 className="text-xl font-extrabold text-gray-700">Featured Product</h2>
      <div className="carousel w-full mt-4">
        {products.map((product, index) => (
          <div
            id={`slide${product.id}`}
            key={product.id}
            className="carousel-item relative w-full flex flex-col items-center"
          >
            <img
              src={product.image}
              className="rounded-lg object-cover w-40 h-40" // Set fixed width and height here
              alt={product.name}
            />
            {/* Display name and price below the image */}
            <div className="text-center mt-2">
              <p className="text-md font-extrabold">{product.name}</p>
              <p className="text-lg font-extrabold text-blue-600">{product.price}</p>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${index === 0 ? products.length : product.id - 1}`}
                className="btn btn-circle"
              >
                ❮
              </a>
              <a
                href={`#slide${
                  index === products.length - 1 ? 1 : product.id + 1
                }`}
                className="btn btn-circle"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProductCard;
