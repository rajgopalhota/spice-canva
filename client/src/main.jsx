import React, { Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Loader from "./components/Loader.jsx";
import "./styles/index.css";
import { BrowserRouter as Router } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css"; // Import the CSS for data-aos
import { LoadingProvider } from "./components/LoadBarContext.jsx";
import { AuthProvider } from "./authContext.jsx";

AOS.init({
  offset: -10, // Set the offset globally to 200 pixels
});

const Root = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <LoadingProvider>
          <Suspense fallback={<Loader />}>
            {isLoading ? <Loader /> : <App />}
          </Suspense>
        </LoadingProvider>
      </Router>
    </AuthProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
