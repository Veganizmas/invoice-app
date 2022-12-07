import httpClient from "../http-common";

const getAll = () => {
  return httpClient.get("/invoices");
};

const create = (data) => {
  return httpClient.post("/invoices", data);
};

const get = (id) => {
  return httpClient.get(`/invoices/${id}`);
};

const update = (data) => {
  return httpClient.post(`/invoices`, data);
};

// const update = (data, id) => {
//   return httpClient.put(`/invoices/${id}`, data);
// };

const remove = (id) => {
  return httpClient.delete(`/invoices/${id}`);
};
export default { getAll, create, get, update, remove };