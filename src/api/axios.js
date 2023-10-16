import axios from "axios";


export default axios.create({
  baseURL: "http://localhost:5555",
  headers:{'content-type':'application/json',}
});