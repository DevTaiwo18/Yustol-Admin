import React, { useState } from "react";
import axios from "axios";
import "./AddPackage.css";

const AddPackage = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle price formatting
  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(value)) {
      setPrice(new Intl.NumberFormat().format(value)); // Add commas for display
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !type || !image) {
      setMessage("Please fill in all fields");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price.replace(/,/g, "")); // Remove commas for backend
      formData.append("type", type);
      formData.append("image", image);

      console.log("Submitting form data:", { title, price, type, image });

      const response = await axios.post(
        "https://yustol-global-backend.onrender.com/api/packages", // Adjust the endpoint if necessary
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage("Package added successfully!");
      console.log("Response:", response.data);

      // Reset form fields
      setTitle("");
      setPrice("");
      setType("");
      setImage(null);
      document.getElementById("image").value = ""; // Clear file input
    } catch (error) {
      console.error("Error response:", error.response);
      setMessage(
        error.response?.data?.message || "Failed to add package. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-package-container">
      <h2 className="title">Add a New Package</h2>

      {message && (
        <div
          className={`alert ${
            message.includes("successfully") ? "alert-success" : "alert-error"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Package title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={handlePriceChange}
            placeholder="Package price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Package type (e.g., round trip, one-way)"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Adding..." : "Add Package"}
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
