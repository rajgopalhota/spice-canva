import React from "react";
import Sidebar from "./pages/Sidebar";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import AddRecipie from "./pages/AddRecipie";
import Recipies from "./pages/Recipies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TrendingFoods from "./pages/Trending";
import { Toaster } from "react-hot-toast";
import Readmore from "./pages/Readmore";

function App() {
  return (
    <div className="main">
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
          <Route path="/recipes/read/:id/*" element={<Readmore />} />
          <Route path="/post-recipe" element={<AddRecipie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/onboard" element={<Register />} />
        </Routes>
      </div>
      {/* <Smoke /> */}
    </div>
  );
}

export default App;
