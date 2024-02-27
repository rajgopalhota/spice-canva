import React, { useState } from 'react';
import Sidebar from './pages/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Smoke from './components/Smoke';
import Home from './pages/Home';
import AddRecipie from './pages/AddRecipie';
import Recipies from './pages/Recipies';
import Login from './pages/Login';
import Register from './pages/Register';
import TrendingFoods from './pages/Trending';
function App() {

  return (
    <div className="main">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/trending" element={<TrendingFoods/>} />
          <Route path="/recipes" element={<Recipies/>} />
          <Route path="/post-recipe" element={<AddRecipie/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/onboard" element={<Register/>} />
        </Routes>
      </div>
      <Smoke/>
    </div>
  );
}

export default App;
