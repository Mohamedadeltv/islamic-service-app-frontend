import React, { useState } from "react";
import SurahDetails from "./components/SurahDetails";
import PrayerTimes from "./components/PrayerTimes";
import MosqueLocator from "./components/MosqueLocator";
import RandomAyah from "./components/RandomAyah";

function App() {
  const [activeTab, setActiveTab] = useState("quran"); // Default tab

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 py-12 text-center text-white">
        <h1 className="text-4xl font-bold">Welcome to Islamic Services</h1>
      
        <p className="mt-4 text-lg italic">
  "And We have certainly made the Quran easy for remembrance, so is there any who will remember?"
</p>
<p className="mt-2 text-sm">- Quran (54:17)</p>

      </header>

      {/* Tab Navigation */}
      <nav className="sticky top-0 bg-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto p-4">
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <li>
              <button
                onClick={() => setActiveTab("quran")}
                className={`text-gray-800 hover:text-green-600 transition duration-300 ${
                  activeTab === "quran" ? "font-bold text-green-600" : ""
                }`}
              >
                📖 Quran
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("prayer")}
                className={`text-gray-800 hover:text-green-600 transition duration-300 ${
                  activeTab === "prayer" ? "font-bold text-green-600" : ""
                }`}
              >
                🕌 Prayer Times
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("mosque")}
                className={`text-gray-800 hover:text-green-600 transition duration-300 ${
                  activeTab === "mosque" ? "font-bold text-green-600" : ""
                }`}
              >
                🕋 Mosque Locator
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("ayah")}
                className={`text-gray-800 hover:text-green-600 transition duration-300 ${
                  activeTab === "ayah" ? "font-bold text-green-600" : ""
                }`}
              >
                🌙 Random Ayah
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Quran Section */}
        {activeTab === "quran" && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📖 Quran</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <SurahDetails />
            </div>
          </section>
        )}

        {/* Prayer Times Section */}
        {activeTab === "prayer" && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🕌 Prayer Times</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <PrayerTimes />
            </div>
          </section>
        )}

        {/* Mosque Locator Section */}
        {activeTab === "mosque" && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🕋 Mosque Locator</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <MosqueLocator />
            </div>
          </section>
        )}

        {/* Random Ayah Section */}
        {activeTab === "ayah" && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🌙 Random Ayah</h2>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <RandomAyah />
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-600 py-6 bg-white shadow-lg">
        <p>© 2023 Islamic Services. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;