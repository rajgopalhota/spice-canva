import axios from "../axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import RecipeDetails from "../components/DetailedView";
import DataLoad from "../components/DataLoad";

export default function Readmore() {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  // Get the ID from the URL
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [dupLoad, setDupLoad] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Display loader toast with a promise
        const promise = new Promise((resolve, reject) => {
          // Fetch data from the API
          axios
            .get(`/recipes/${id}`) // Corrected URL
            .then((response) => {
              setData(response.data);
              setDupLoad(false);
              resolve(); // Resolve the promise when data is fetched successfully
            })
            .catch((error) => {
              reject(error); // Reject the promise if there's an error
            });
        });

        // Show loading toast with promise
        toast.promise(promise, {
          loading: "Fetching your recipe",
          success: "Recipe fetched successfully",
          error: "Error fetching recipes",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]); // Include 'id' as a dependency to re-fetch data when the ID changes

  return (
    <div>
      {dupLoad && <DataLoad />}
      {data && <RecipeDetails recipe={data} />}
    </div>
  );

}
