import React, { useState } from 'react';
import Sidebar from './pages/Sidebar';

function App() {

  return (
    <div className="">
      <Sidebar />
      <div className="main-content">
        <h1>Home</h1>
        <p>Welcome to the Home page</p>
      </div>
    </div>
  );
}

export default App;
