import React from "react";
import { AiOutlineMail, AiOutlineShop, AiOutlineUser } from "react-icons/ai";
import { FaAmazon, FaShopify, FaTiktok } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

const AddVendorForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {/* Container for the form */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-5xl p-10 space-y-6">
        <h2 className="text-4xl font-bold text-center text-pink-600">
          Register Vendor
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Company name</span>
            </label>
            <AiOutlineShop
              className="absolute left-3 top-[60px] transform -translate-y-1/2 text-pink-600"
              size={20}
            />
            <input
              type="text"
              placeholder="Company name"
              className="input input-bordered pl-10 w-full"
            />
          </div>

          {/* First Name */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">First name</span>
            </label>
            <AiOutlineUser
              className="absolute left-3 top-[60px] transform -translate-y-1/2 text-pink-600"
              size={20}
            />
            <input
              type="text"
              placeholder="First name"
              className="input input-bordered pl-10 w-full"
            />
          </div>

          {/* Surname */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Surname</span>
            </label>
            <AiOutlineUser
              className="absolute left-3 top-[60px]  transform -translate-y-1/2 text-pink-600"
              size={20}
            />
            <input
              type="text"
              placeholder="Surname"
              className="input input-bordered pl-10 w-full"
            />
          </div>

          {/* Email Field */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <AiOutlineMail
              className="absolute left-3 top-[60px]  transform -translate-y-1/2 text-pink-600"
              size={20}
            />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered pl-10 w-full"
            />
          </div>

          {/* Choose Color Scheme */}
          <div className="form-control">
            <label className="label">Choose color scheme</label>
            <select className="select select-bordered w-full">
              <option>Pink</option>
              <option>Blue</option>
              <option>Green</option>
            </select>
          </div>

          {/* Select Product Category */}
          <div className="form-control">
            <label className="label">Select Product Category</label>
            <select className="select select-bordered w-full">
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home Goods</option>
              <option>Beauty</option>
            </select>
          </div>

          {/* Company Description */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Company Description</span>
            </label>
            <textarea
              placeholder="Company Description"
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          {/* Upload Company Logo */}
          <div className="form-control md:col-span-2">
            <label className="label">Upload Company Logo here</label>
            <label className="w-full h-24 border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer">
              <FiUpload size={24} className="text-pink-600" />
              <input type="file" className="hidden" />
            </label>
          </div>

          {/* Selling Platforms */}
          <div className="form-control md:col-span-2">
            <label className="label text-lg font-semibold text-gray-700 mb-4">
              Where would you like to sell?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Amzify */}
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-pink-50 transition">
                <input
                  type="checkbox"
                  className="checkbox checkbox-pink accent-pink-600 h-5 w-5 rounded"
                />
                <span className="flex items-center text-gray-700 font-medium">
                  Amzify
                </span>
              </label>

              {/* Amazon */}
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-pink-50 transition">
                <input
                  type="checkbox"
                  className="checkbox checkbox-pink accent-pink-600 h-5 w-5 rounded"
                />
                <FaAmazon className="w-6 h-6 text-black" />
                <span className="text-gray-700 font-medium">Amazon</span>
              </label>

              {/* Shopify */}
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-pink-50 transition">
                <input
                  type="checkbox"
                  className="checkbox checkbox-pink accent-pink-600 h-5 w-5 rounded"
                />
                <FaShopify className="w-6 h-6 text-green-600" />
                <span className="text-gray-700 font-medium">Shopify</span>
              </label>

              {/* TikTok */}
              <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-pink-50 transition">
                <input
                  type="checkbox"
                  className="checkbox checkbox-pink accent-pink-600 h-5 w-5 rounded"
                />
                <FaTiktok className="w-6 h-6 text-black" />
                <span className="text-gray-700 font-medium">TikTok</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control md:col-span-2">
            <button className="btn bg-pink-600 w-full text-white hover:bg-pink-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVendorForm;