import axios from "axios";

export default axios.create({
  baseURL: "https://geo.api.gouv.fr/",
});
