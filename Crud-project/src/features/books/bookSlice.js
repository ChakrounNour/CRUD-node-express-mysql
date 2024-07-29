import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BookService from "../../data/services/bookService";

const initialState = {
  book: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const GetAllBook = createAsyncThunk(
  "book/GetAllBook",
  async (_, thunkApi) => {
    try {
      const response = await BookService.getAll;
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);

export const CreateBook = createAsyncThunk(
  "book/CreateBook",
  async (title, author, thunkApi) => {
    try {
      const response = await BookService.create({
        title,
        author,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);
export const UpdateBook = createAsyncThunk(
  "book/UpdateBook",
  async (id, book, thunkApi) => {
    try {
      const response = await BookService.update(id, book);
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkApi.rejectWithValue(message);
      }
    }
  }
);

export const DeleteBook = createAsyncThunk(
  "book/DeleteBook",
  async ({ id }) => {
    await BookService.deletes(id);
    return { id };
  }
);
export const deleteAllBooks = createAsyncThunk("books/deleteAll", async () => {
  const res = await BookService.deleteAll();
  return res.data;
});

export const findBooksByTitle = createAsyncThunk(
  "books/findByTitle",
  async ({ title }) => {
    const res = await BookService.findByTitle(title);
    return res.data;
  }
);
export const booksSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
});
// export const {  } = booksSlice.actions
export default booksSlice.reducer;
