import React, {useState, useEffect} from "react";
import Hero from "../components/Hero";
import HeroCards from "../components/HeroCards";
import LoadingBar from "react-top-loading-bar";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Set loading to false after 1 second

    return () => clearTimeout(timer); // Cleanup function
  }, []);

  return (
    <div className="home-container">
      <LoadingBar
        color="#f11946"
        progress={loading ? 100 : 0}
        onLoaderFinished={() => setLoading(false)}
        style={{ height: "5px" }}
      />
      <Hero />
      <HeroCards />
    </div>
  );
};

export default Home;
