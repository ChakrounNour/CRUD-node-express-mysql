import { createSlice } from "@reduxjs/toolkit";
import {
  createBook,
  deleteBook,
  findBooksByTitle,
  getAllBook,
  getByIdBook,
  updateBook,
} from "./bookActions";

const initialState = {
  bookList: [],
  book: null,
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
      .addCase(getByIdBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getByIdBook.fulfilled, (state, action) => {
        console.log("Action payload getByIdBook:", action.payload);
        state.book = action.payload;

        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getByIdBook.rejected, (state, action) => {
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
