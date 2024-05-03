import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage, hidePagination } =
      params;
    let apiUrl = `https://65f17541034bdbecc762acf0.mockapi.io/items?page=${currentPage}`;

    if (!hidePagination) {
      apiUrl += `&limit=4`;
    } else {
      apiUrl += `${category}&sortBy=${sortBy}&order=${order}${search}`;
    }

    const { data } = await axios.get(apiUrl);
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
  paginationVisible: true,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setPaginationVisibility(state, action) {
      state.paginationVisible = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems, setPaginationVisibility } = pizzaSlice.actions;

export default pizzaSlice.reducer;
