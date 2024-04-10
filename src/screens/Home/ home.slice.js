import { createAction, createReducer, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios để gọi API

const API_KEY = '1cf6ed622c7cd055163b7d9171440a91';
const BASE_URL = 'https://api.themoviedb.org/3';

// Action creator bất đồng bộ sử dụng Redux Thunk
const getData = createAsyncThunk(
  'home/getdata',
  async (page) => {
    console.log('page', page)
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
    const response = await axios.get(url);
    const newData = response.data.results
    // console.log('newData', newData)
    // await new Promise(resolve => setTimeout(resolve, 5000)); // Đợi 1 giây trước khi trả về dữ liệu
    return newData;
  }
);

const initialState = {
  postList: [],
  loading: 'idle', // Trạng thái ban đầu là idle
  error: null
};

const homeSlice = createSlice({
  name: 'home', // Tên của slice phải là một chuỗi
  initialState,
  reducers: {
    // Định nghĩa các reducers ở đây nếu cần
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = 'loading'; // Trạng thái loading khi action pending
        // console.log('Loading...'); // Log khi action đang loading
      })
      .addCase(getData.fulfilled, (state, action) => {
        // console.log('actionpayload', [...state.postList,...state.payload])
        state.loading = 'idle'; // Trạng thái idle khi action fulfilled
        if (action.payload.page === 1) {
          state.postList = action.payload
        } else {
          state.postList = state.postList.concat(action.payload)
        }
      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = 'idle'; // Trạng thái idle khi action rejected
        state.error = action.error.message;
      });
  },
});

export { getData }; // Export action creator getData
export default homeSlice.reducer; // Export reducer của slice
