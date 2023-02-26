import axios from "axios";

export default axios.create({
  responseType: "json",
  baseURL: "https://vehicles.free.beeceptor.com/",
});
