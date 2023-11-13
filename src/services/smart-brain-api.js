import axios from "axios";

export const baseUrl = "https://gentle-peak-22771-49b6f22f4547.herokuapp.com/";

export default axios.create({
  baseURL: baseUrl,
});
