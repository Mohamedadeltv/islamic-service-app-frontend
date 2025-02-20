import React, { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const RandomAyah = () => {
  const [ayah, setAyah] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRandomAyah = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:8080/random-ayah");
      setAyah(response.data);
    } catch (error) {
      setError("Failed to fetch a random Ayah. Please try again.");
      console.error("Error fetching random Ayah:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section: Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Random Ayah</h2>
          <div className="space-y-4">
            <button
              onClick={fetchRandomAyah}
              disabled={loading}
              className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Get Random Ayah"}
            </button>
          </div>
          {/* Inspirational Text */}
          <div className="mt-8 text-center text-gray-600">
            <p className="text-lg">
              "And We have certainly made the Quran easy for remembrance, so is there any who will remember?"
            </p>
            <p className="mt-2 text-sm">- Quran (54:17)</p>
          </div>
        </div>

        {/* Right Section: Ayah Output */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Ayah Details</h2>
          {error && <p className="text-center text-red-500">{error}</p>}
          {ayah && (
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-800">{ayah.name}</h3>
              <p className="text-gray-600">{ayah.revelationType}</p>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{ayah.text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RandomAyah;