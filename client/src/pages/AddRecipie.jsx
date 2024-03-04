import React from "react";
import RecipeForm from "../components/RecipeForm";
import { useAuth } from "../authContext";

export default function AddRecipie() {
  const auth = useAuth();
  return <>{auth.user ? <RecipeForm /> : <h1>Welcome, guest</h1>}</>;
}
