import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrending",
  async () => {
    const res = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
    );
    return res.data.results;
  }
);

interface MovieState {
  trending: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  trending: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.trending = action.payload;
        state.loading = false;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default moviesSlice.reducer;
