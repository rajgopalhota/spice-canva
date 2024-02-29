import React, { useState, useEffect } from "react";
import Sidebar from "./pages/Sidebar";
import { Route, Routes } from "react-router-dom";
import Smoke from "./components/Smoke";
import Home from "./pages/Home";
import AddRecipie from "./pages/AddRecipie";
import Recipies from "./pages/Recipies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TrendingFoods from "./pages/Trending";
import LoadingBar from "react-top-loading-bar";
import { Toaster } from "react-hot-toast";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Set loading to false after 1 second

    return () => clearTimeout(timer); // Cleanup function
  }, []);

  return (
    <div className="main">
      <LoadingBar
        color="#f11946"
        progress={loading ? 100 : 0}
        onLoaderFinished={() => setLoading(false)}
      />
      <Sidebar />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        style={{
          background: "#333", // Background color
          color: "#fff", // Text color
          borderRadius: "8px", // Border radius
        }}
      />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<TrendingFoods />} />
          <Route path="/recipes" element={<Recipies />} />
          <Route path="/post-recipe" element={<AddRecipie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboard" element={<Register />} />
        </Routes>
      </div>
      <Smoke />
    </div>
  );
}

export default App;
