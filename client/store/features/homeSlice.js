/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchHomePageData = createAsyncThunk('home/fetchContent', () => {
  console.log('Hleo');
  return {
    genres: [
      { _id: 1, name: 'Action' },
      { _id: 2, name: 'Drama' },
      { _id: 3, name: 'Sci-fi' },
    ],
    upcomingMovieList: [
      {
        photo:
          'https://res.cloudinary.com/crossify/image/upload/v1621453716/Event/tonton-revolver-clash-of-code.jpg.jpg',
        _id: '656980df2f28c9ac38aae2d2',
        name: 'Batman',
        releaseDate: '12/12/2003',
        studio: 'DC Studio',
        director: 'Nolan',
        description: 'Gajab',
        tags: ['Sci-fi'],
        liked: false,
      },
    ],
    theaterList: [
      { _id: 1, name: 'Theater 1' },
      { _id: 2, name: 'Theater 2' },
    ],
    genreMovieList: [
      {
        _id: 1,
        name: 'Sci-fi',
        movieList: [
          {
            photo:
              'https://res.cloudinary.com/crossify/image/upload/v1621453716/Event/tonton-revolver-clash-of-code.jpg.jpg',
            _id: 1,
            name: 'Batman',
            releaseDate: '12/12/2003',
            studio: 'DC Studio',
            director: 'Nolan',
            description: 'Gajab',
            tags: ['Sci-fi'],
            liked: false,
          },
        ],
      },
      { _id: 2, name: 'Genre 2' },
    ],
  };
});

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHomePageData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHomePageData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchHomePageData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default homeSlice.reducer;
