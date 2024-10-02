
import React, { useCallback, useEffect, useState } from "react";
import {
  AiOutlineLink,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineShop,
  AiOutlineUser,
} from "react-icons/ai";
import { FaShopify } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import FormInput from "../../components/FormInput";
import LoadingSpinner from "../../components/LoadingSpinner"; // Ensure correct path
import axiosInstance from "../../services/instantAxios";

const AddVendorForm = () => {
  const [platforms, setPlatforms] = useState([]); // State to store platforms
  const [selectedPlatforms, setSelectedPlatforms] = useState([]); // State for selected platform IDs
  const [formData, setFormData] = useState({
    name: "", // corresponds to 'name' on the server
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    url: "",
    description: "",
    logo: null,
    shopifyStoreId: "",
    amazonStoreId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission
  const [isFetching, setIsFetching] = useState(true); // Loading state for fetching platforms

  // Fetch platforms from API when component mounts
  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await axiosInstance.get("/platforms");
        if (response.data?.type === "Success") {
          setPlatforms(response.data.data.platforms); // Store platforms in state
        } else {
          toast.error("Failed to retrieve platforms.");
          console.error("Failed to retrieve platforms");
        }
      } catch (error) {
        toast.error("Error fetching platforms.");
        console.error("Error fetching platforms:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchPlatforms(); // Fetch platforms on mount only once
  }, []);

  // Handle input changes for controlled components
  const handleInputChange = useCallback((e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  // Handle checkbox change for platforms (collecting platform IDs)
  const handlePlatformChange = useCallback((e) => {
    const { value, checked } = e.target;
    setSelectedPlatforms((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  }, []);

  // Validate form data before submission
  const validateForm = () => {
    const {
      name,
      firstName,
      lastName,
      email,
      phoneNumber,
      url,
      description,
    } = formData;

    if (
      !name ||
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !url ||
      !description
    ) {
      toast.error("Please fill in all required fields.");
      return false;
    }

    // Basic email regex
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch (_) {
      toast.error("Please enter a valid URL.");
      return false;
    }

    return true;
  };

  // Helper function to log FormData
  const logFormData = (formData) => {
    console.log("----- FormData Content -----");
    for (let [key, value] of formData.entries()) {
      if (key === "logo" && value instanceof File) {
        console.log(`${key}: ${value.name} (${value.type}, ${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
    console.log("----- End of FormData -----");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const submissionData = new FormData();

      // Append all formData fields with correct server field names
      submissionData.append("firstName", formData.firstName);
      submissionData.append("lastName", formData.lastName);
      submissionData.append("email", formData.email);
      submissionData.append("name", formData.name);
      submissionData.append("description", formData.description);
      submissionData.append("url", formData.url);
      submissionData.append("phoneNumber", formData.phoneNumber);
      submissionData.append("shopifyStoreId", formData.shopifyStoreId);
      submissionData.append("amazonStoreId", formData.amazonStoreId);

      // Append platforms as an array
      selectedPlatforms.forEach((platformId) => {
        submissionData.append("platforms[]", platformId);
      });

      // Append logo file if it exists
      if (formData.logo) {
        submissionData.append("logo", formData.logo);
      }

      // Log the FormData content before sending
      logFormData(submissionData);

      // Send the form data to the server via POST request
      const response = await axiosInstance.post("/vendors", submissionData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.type === "Success") {
        toast.success("Vendor registered successfully!");
        // Optionally reset the form
        setFormData({
          name: "",
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          url: "",
          description: "",
          logo: null,
          shopifyStoreId: "",
          amazonStoreId: "",
        });
        setSelectedPlatforms([]);
      } else {
        toast.error(response.data.message || "Failed to register vendor.");
        console.error("Failed to register vendor:", response.data);
      }
    } catch (error) {
      toast.error("An error occurred during submission.");
      console.error("Error submitting form:", error);

      // Additionally, log the server response if available
      if (error.response) {
        console.log("Server Response:", error.response.data);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 lg:p-10 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-pink-600">
          Register Vendor
        </h2>

        {isFetching ? (
          <LoadingSpinner /> // Use the reusable LoadingSpinner component
        ) : (
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            {/* Company Name */}
            <FormInput
              label="Company Name"
              icon={AiOutlineShop}
              name="name" // Must match 'name' in formData
              placeholder="Company Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            {/* First Name */}
            <FormInput
              label="First Name"
              icon={AiOutlineUser}
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />

            {/* Last Name */}
            <FormInput
              label="Last Name"
              icon={AiOutlineUser}
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />

            {/* Email Field */}
            <FormInput
              label="Email"
              type="email"
              icon={AiOutlineMail}
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            {/* Phone Number */}
            <FormInput
              label="Phone Number"
              icon={AiOutlinePhone}
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />

            {/* Website URL */}
            <FormInput
              label="Website URL"
              type="url"
              icon={AiOutlineLink}
              name="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={handleInputChange}
              required
            />

            {/* Company Description */}
            <div className="form-control md:col-span-2">
              <label className="label" htmlFor="description">
                <span className="label-text">Company Description</span>
              </label>
              <textarea
                id="description"
                name="description" // Must match 'description' in formData
                placeholder="Company Description"
                className="textarea textarea-bordered w-full"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            {/* Upload Company Logo */}
            <div className="form-control md:col-span-2">
              <label className="label" htmlFor="logo">
                Upload Company Logo
              </label>
              <label
                htmlFor="logo"
                className="w-full h-16 border-dashed border-2 border-gray-400 flex items-center justify-center cursor-pointer relative"
              >
                <FiUpload size={24} className="text-pink-600" />
                {formData.logo && (
                  <span className="absolute bottom-1 left-1 text-xs text-gray-600">
                    {formData.logo.name}
                  </span>
                )}
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Selling Platforms (Dynamic from API, collecting IDs) */}
            <div className="form-control md:col-span-2">
              <label className="label text-lg font-semibold text-gray-700 mb-4">
                Where would you like to sell?
              </label>
              {platforms.length === 0 ? (
                <div>No platforms available.</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {platforms.map((platform) => (
                    <label
                      key={platform._id}
                      className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg hover:bg-pink-50 transition cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={platform._id} // Collect the platform's ID
                        checked={selectedPlatforms.includes(platform._id)}
                        onChange={handlePlatformChange}
                        className="checkbox checkbox-pink accent-pink-600 h-5 w-5 rounded"
                      />
                      {platform.logo ? (
                        <img
                          src={platform.logo}
                          alt={platform.name}
                          className="w-6 h-6 object-contain"
                        />
                      ) : (
                        <FaShopify className="w-6 h-6 text-green-600" />
                      )}
                      <span className="text-gray-700 font-medium">
                        {platform.name}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Shopify Store ID */}
            <FormInput
              label="Shopify Store ID"
              name="shopifyStoreId"
              placeholder="Shopify Store ID"
              value={formData.shopifyStoreId}
              onChange={handleInputChange}
            />

            {/* Amazon Store ID */}
            <FormInput
              label="Amazon Store ID"
              name="amazonStoreId"
              placeholder="Amazon Store ID"
              value={formData.amazonStoreId}
              onChange={handleInputChange}
              required
            />

            {/* Submit Button */}
            <div className="form-control md:col-span-2">
              <button
                type="submit"
                className="btn bg-pink-600 w-full text-white hover:bg-pink-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddVendorForm;
