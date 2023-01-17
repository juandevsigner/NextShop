import axios from "axios";

const nextshopApi = axios.create({
  baseURL: "/api",
});

export default nextshopApi;
