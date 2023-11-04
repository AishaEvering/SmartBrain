import axios from "axios";

export default axios.create({
  baseURL: "https://api.clarifai.com/v2/models/",
});
