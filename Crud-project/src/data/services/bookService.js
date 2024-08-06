import axios from "axios";
import http from "../http-common";

const getAll = async (keyword, page, limit) => {
  return http.get(`/books?search_query=${keyword}&page=${page}&limit=${limit}`);
};

const get = (id) => {
  return http.get(`/books/${id}`);
};

const create = (data) => {
  return http.post("/books", data);
};

const update = (id, data) => {
  return http.patch(`/books/${id}`, data);
};
const deletes = (id) => {
  return http.delete(`/books/${id}`);
};
const deleteAll = () => {
  return http.delete(`/books`);
};

const findByTitle = (title) => {
  return http.get(`/books?title=${title}`);
};
const BookService = {
  getAll,
  create,
  deleteAll,
  deletes,
  update,
  get,
  findByTitle,
};

export default BookService;
