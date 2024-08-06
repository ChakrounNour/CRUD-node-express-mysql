import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import BookService from "../../data/services/bookService";

const initialState = {
  bookList: [],
  isLoading: false,
  isError: false,
  message: "",
  totalPage: 0,
  limit: 5,
  totalRow: 0,
  page: 0,
  keyword: "",
  query: "",
  msg: "",
};
export const getAllBook = createAsyncThunk(
  "books/getAll",
  async ({ keyword, page, limit }, thunkAPI) => {
    try {
      const response = await BookService.getAll(keyword, page, limit);
      console.log("Fetched books:", response.data); // Log the fetched books
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
  async ({ id }, thunkApi) => {
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

export const booksSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    changeStateTrue: (state) => {
      state.updateState = true;
    },
    changeStateFalse: (state) => {
      state.updateState = false;
    },
    clearResponse: (state) => {
      state.response = "";
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setPage: (state, action) => {
      console.log("New page:", action.payload);
      state.page = action.payload;
    },
    setMsg: (state, action) => {
      state.msg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBook.fulfilled, (state, action) => {
        console.log("Action payload:", action.payload);
        state.bookList = action.payload.result;
        state.totalPage = action.payload.totalPage;
        state.totalRow = action.payload.totalRows;
        state.page = action.payload.page;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getAllBook.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.bookList.push(action.payload);
        state.response = "add";
        state.isSuccess = true;
      })
      .addCase(createBook.rejected, (state, action) => {
        state.message = action.payload;
        state.isError = true;
      })
      .addCase(findBooksByTitle.fulfilled, (state, action) => {
        state.bookList = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(findBooksByTitle.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.bookList = state.bookList.filter(
          (item) => item._id !== action.payload.id
        );
        state.response = "delete";
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.bookList.findIndex(
          (item) => item.id === updatedItem.id
        );
        if (index !== -1) {
          state.bookList[index] = updatedItem;
        }
        state.response = "update";
      });
  },
});

export const {
  changeStateTrue,
  changeStateFalse,
  clearResponse,
  setQuery,
  setKeyword,
  setPage,
} = booksSlice.actions;
booksSlice.actions;
export default booksSlice.reducer;
