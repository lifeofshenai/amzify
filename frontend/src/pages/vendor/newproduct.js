import { useState } from "react";

export default function AddNewProduct() {
  // State to hold images
  const [images, setImages] = useState([]);

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    // Store the selected images in the state
    setImages((prevImages) => [...prevImages, ...files]);
  };

  // Remove selected image
  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-700">Add New Product</h1>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
          Save as Draft
        </button>
        <button className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">
          New Product
        </button>
      </div>

      {/* Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600">Name</label>
            <input
              type="text"
              placeholder="Product name"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-600">Brand</label>
            <select className="w-full p-2 border border-gray-300 rounded">
              <option>Select Brand</option>
              <option>Brand A</option>
              <option>Brand B</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600">Description</label>
            <textarea
              placeholder="Product description"
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-gray-600">Upload images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-pink-500 file:text-white
              hover:file:bg-pink-600"
            />

            {/* Image Previews */}
            <div className="mt-4 flex space-x-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded Preview ${index}`}
                    className="w-24 h-24 object-cover border border-gray-300 rounded"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <label className="block text-gray-600">Size (Optional)</label>
            <div className="flex space-x-2">
              <button className="p-2 border border-gray-300 rounded">S</button>
              <button className="p-2 border border-gray-300 rounded">M</button>
              <button className="p-2 border border-gray-300 rounded">L</button>
              <button className="p-2 border border-gray-300 rounded">XL</button>
            </div>
          </div>

          {/* Category Section */}
          <div>
            <label className="block text-gray-600">Category</label>
            <div className="flex space-x-2">
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Select Category</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-600">Sub Category</label>
            <div className="flex space-x-2">
              <select className="w-full p-2 border border-gray-300 rounded">
                <option>Select Sub Category</option>
              </select>
            </div>
          </div>

          {/* Add New Button */}
          <button className="bg-pink-500 text-white py-2 px-4 w-full rounded hover:bg-pink-600">
            Add New
          </button>
        </div>
      </div>
    </div>
  );
}
