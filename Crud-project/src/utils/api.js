import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getBooks = () => axios.get(`${BASE_URL}/books`);

export const createBooks = (title, author) => {
  return axios.post(`${BASE_URL}/books`, { title, author });
};

export const updateBooks = (title, author) => {
  return axios.patch(`${BASE_URL}/books/id`, { title, author });
};
