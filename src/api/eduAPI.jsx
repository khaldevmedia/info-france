import axios from "axios";

export default axios.create({
  baseURL:
    "https://data.education.gouv.fr/api/explore/v2.1/catalog/datasets/fr-en-annuaire-education/records",
});
