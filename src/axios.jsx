import axios from "axios";

const authToken = localStorage.getItem("authToken"); // Retrieve auth token from local storage

const instance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Authorization: authToken, // Use auth token in the authorization header
  },
});

export default instance;
