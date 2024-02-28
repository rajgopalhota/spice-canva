import React, { Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Loader from "./components/Loader.jsx";
import "./styles/index.css";
import { BrowserRouter as Router } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css"; // Import the CSS for data-aos

AOS.init({
  offset: -10, // Set the offset globally to 200 pixels
});

const Root = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        {isLoading ? <Loader /> : <App />}
      </Suspense>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
