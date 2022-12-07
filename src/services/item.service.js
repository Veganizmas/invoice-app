// Sitas failas suvalgo Spring endpointus ir leidzia naudoti funkcijose, pagal metodo pavadinimus
import httpClient from "../http-common";

const getAll = () => {
  return httpClient.get("/items");
};

const create = (data) => {
  return httpClient.post("/items", data);
};

const get = (id) => {
  return httpClient.get(`/items/${id}`);
};

const update = (data, id) => {
  return httpClient.post(`/items`, data);
};

const remove = (id) => {
  return httpClient.delete(`/items/${id}`);
};
export default { getAll, create, get, update, remove };