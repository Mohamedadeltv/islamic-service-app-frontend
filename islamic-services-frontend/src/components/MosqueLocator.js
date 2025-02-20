import React, { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const MosqueLocator = () => {
  const [mosques, setMosques] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchNearestMosques = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:8080/nearest-mosque");
      setMosques(response.data);
    } catch (error) {
      setError("Failed to fetch mosques. Please try again.");
      console.error("Error fetching mosques:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section: Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Mosque Locator</h2>
          <div className="space-y-4">
            <button
              onClick={fetchNearestMosques}
              disabled={loading}
              className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Find Mosques"}
            </button>
          </div>
          {/* Inspirational Text */}
          <div className="mt-8 text-center text-gray-600">
            <p className="text-lg">
              "The mosques of Allah are only to be maintained by those who believe in Allah and the Last Day."
            </p>
            <p className="mt-2 text-sm">- Quran (9:18)</p>
          </div>
        </div>

       {/* Right Section: Mosque List */}
<div className="bg-white rounded-xl shadow-lg p-6 h-[500px] overflow-y-auto">
  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Nearest Mosques</h2>
  {error && <p className="text-center text-red-500">{error}</p>}
  {mosques.length > 0 && (
    <div className="space-y-4">
      {mosques.map((mosque, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">{mosque.name}</h3>
          <p className="text-gray-600">{mosque.district}</p>
          <p className="text-gray-600">{mosque.street}</p>
        </div>
      ))}
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default MosqueLocator;