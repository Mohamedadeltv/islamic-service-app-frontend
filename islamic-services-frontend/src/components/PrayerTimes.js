import React, { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const PrayerTimes = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [method, setMethod] = useState("5"); // Default method (ISNA)
  const [timings, setTimings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPrayerTimes = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (city) params.append("city", city);
      if (country) params.append("country", country);
      if (date) params.append("date", date);
      params.append("method", method);

      const response = await axios.get(`http://localhost:8080/prayer-times?${params.toString()}`);
      console.log("API Response:", response.data); // Log the API response
      if (response.data && response.data.Fajr) {
        setTimings(response.data);
      } else {
        setError("Invalid prayer times data received.");
      }
    } catch (error) {
      setError("Failed to fetch prayer times. Please check your input and try again.");
      console.error("Error fetching prayer times:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section: Input Fields */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Prayer Times</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="City (optional)"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300 w-full"
            />
            <input
              type="text"
              placeholder="Country (optional)"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300 w-full"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300 w-full"
            />
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="border-2 border-gray-200 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300 w-full"
            >
              <option value="0">Shia Ithna-Ansari</option>
              <option value="1">University of Islamic Sciences, Karachi</option>
              <option value="2">Islamic Society of North America (ISNA)</option>
              <option value="3">Muslim World League (MWL)</option>
              <option value="4">Umm Al-Qura, Makkah</option>
              <option value="5">Egyptian General Authority of Survey</option>
              <option value="7">Institute of Geophysics, University of Tehran</option>
            </select>
            <button
              onClick={fetchPrayerTimes}
              disabled={loading}
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <FaSpinner className="animate-spin mx-auto" /> : "Get Prayer Times"}
            </button>
          </div>
          {/* Inspirational Text */}
          <div className="mt-8 text-center text-gray-600">
            <p className="text-lg">
              "Establish prayer, for prayer restrains from shameful and unjust deeds."
            </p>
            <p className="mt-2 text-sm">- Quran (29:45)</p>
          </div>
        </div>

        {/* Right Section: Prayer Times Output */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Today's Prayer Times</h2>
          {error && <p className="text-center text-red-500">{error}</p>}
          {timings && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-4">
                  <span role="img" aria-label="Fajr">🌅</span>
                  <p className="text-gray-700"><span className="font-semibold">Fajr:</span> {timings.Fajr}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span role="img" aria-label="Dhuhr">☀️</span>
                  <p className="text-gray-700"><span className="font-semibold">Dhuhr:</span> {timings.Dhuhr}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span role="img" aria-label="Asr">🌤️</span>
                  <p className="text-gray-700"><span className="font-semibold">Asr:</span> {timings.Asr}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span role="img" aria-label="Maghrib">🌇</span>
                  <p className="text-gray-700"><span className="font-semibold">Maghrib:</span> {timings.Maghrib}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span role="img" aria-label="Isha">🌙</span>
                  <p className="text-gray-700"><span className="font-semibold">Isha:</span> {timings.Isha}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrayerTimes;