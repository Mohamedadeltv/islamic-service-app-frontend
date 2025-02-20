import React, { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import Select from "react-select"; // Import React Select
import { surahNames } from "../utils/surahNames"; // Import the Surah names

const SurahDetails = () => {
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [surah, setSurah] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Format Surah names for React Select
  const surahOptions = surahNames.map((name, index) => ({
    value: index + 1, // Surah number
    label: name, // Surah name in Arabic
  }));

  const fetchSurah = async () => {
    if (!selectedSurah) {
      setError("Please select a Surah.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`http://localhost:8080/surah?num=${selectedSurah.value}`);
      setSurah(response.data);
    } catch (error) {
      setError("Failed to fetch Surah. Please try again.");
      console.error("Error fetching Surah:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section: Surah Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Select a Surah</h2>
          <div className="space-y-6">
            {/* Custom Dropdown */}
            <Select
              options={surahOptions}
              value={selectedSurah}
              onChange={setSelectedSurah}
              placeholder="Select a Surah..."
              className="react-select-container"
              classNamePrefix="react-select"
              isSearchable // Allow searching
            />
            <button
              onClick={fetchSurah}
              disabled={loading || !selectedSurah}
              className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Fetch Surah"}
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

        {/* Right Section: Surah Output */}
        <div className="bg-white rounded-xl shadow-lg p-6 h-[500px] overflow-y-auto">
  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Surah Details</h2>
  {error && <p className="text-center text-red-500">{error}</p>}
  {surah && (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-gray-800">{surah.name}</h3>
      <p className="text-gray-600">{surah.revelationType}</p>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{surah.text}</p>
    </div>
  )}
</div>
      </div>
    </div>
  );
};

export default SurahDetails;