import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Packages.css";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("https://yustol-global-backend.onrender.com/api/packages");
        setPackages(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch packages.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;

    try {
      await axios.delete(`https://yustol-global-backend.onrender.com/api/packages/${id}`);
      setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
      alert("Package deleted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete package.");
    }
  };

  return (
    <div className="packages-container">
      <h2 className="title">Travel Packages</h2>

      {loading && <p>Loading packages...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="packages-grid">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <div key={pkg._id} className="package-card">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="package-image"
                />
                <div className="package-details">
                  <h3 className="package-title">{pkg.title}</h3>
                  <p className="package-type">Type: {pkg.type}</p>
                  <p className="package-price">
                    Price: ₦{parseInt(pkg.price).toLocaleString()}
                  </p>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(pkg._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No packages available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Packages;
