import { createAsyncThunk } from "@reduxjs/toolkit";
import BookService from "../../data/services/bookService";

export const getAllBook = createAsyncThunk(
  "books/getAll",
  async ({ keyword, page, limit }, thunkAPI) => {
    try {
      const response = await BookService.getAll(keyword, page, limit);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createBook = createAsyncThunk(
  "book/CreateBook",
  async ({ title, author }, thunkApi) => {
    try {
      const response = await BookService.create({
        title,
        author,
      });
      return response.data.book;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);
export const updateBook = createAsyncThunk(
  "book/UpdateBook",
  async ({ id, title, author }, thunkApi) => {
    try {
      const response = await BookService.update(id, { title, author });
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);

export const getByIdBook = createAsyncThunk(
  "book/GetByIdBook",
  async (id, thunkApi) => {
    try {
      const response = await BookService.get(id);
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/DeleteBook",
  async (id, thunkApi) => {
    try {
      await BookService.deletes(id);
      return { id };
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);

export const deleteAllBooks = createAsyncThunk(
  "books/deleteAll",
  async (_, thunkApi) => {
    try {
      const res = await BookService.deleteAll();
      return res.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);

export const findBooksByTitle = createAsyncThunk(
  "books/findByTitle",
  async ({ title }, thunkApi) => {
    try {
      const res = await BookService.findByTitle(title);
      return res.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);
