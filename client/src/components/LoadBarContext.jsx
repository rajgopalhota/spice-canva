// LoadingContext.js
import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const finishLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, startLoading, finishLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
