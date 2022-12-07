// Sitas failas suvalgo Spring endpointus ir leidzia naudoti funkcijose, pagal metodo pavadinimus
import httpClient from "../http-common";

const getAll = () => {
  return httpClient.get("/customers");
};

const create = (data) => {
  return httpClient.post("/customers", data);
};

const get = (id) => {
  return httpClient.get(`/customers/${id}`);
};

const update = (data) => {
  return httpClient.post(`/customers`, data);
};

// const update = (data, id) => {
//   return httpClient.put(`/customers/${id}`, data);
// };

const remove = (id) => {
  return httpClient.delete(`/customers/${id}`);
};
export default { getAll, create, get, update, remove };
