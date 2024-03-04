import React from "react";
import RecipeForm from "../components/RecipeForm";
import { useAuth } from "../authContext";
import LoginReq from "../components/LoginReq";

export default function AddRecipie() {
  const auth = useAuth();
  return <>{auth.user ? <RecipeForm /> : <LoginReq p = "You need to login for this action?" link = "login"/>}</>;
}
