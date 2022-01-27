import axios from "axios";

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/"
      : "https://russianestateincome.com/api/",
  timeout: 5000,
});

export default client;
