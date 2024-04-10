import { createAction, createReducer, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Import axios để gọi API

// const API_KEY = '1cf6ed622c7cd055163b7d9171440a91';
const BASE_URL = 'https://657186fad61ba6fcc012d47b.mockapi.io/user';

// Action creator bất đồng bộ sử dụng Redux Thunk
const getUser = createAsyncThunk(
  'user/getUser',
  async () => {
    const url = `${BASE_URL}`;
    const response = await axios.get(url);
    const user = response.data
    // console.log('newData',user)
    // await new Promise(resolve => setTimeout(resolve, 5000)); // Đợi 1 giây trước khi trả về dữ liệu
    return user;
  }
);

const initialState = {
  user: [{
    name: '',
    password: ''
  }]
};

const userSlice = createSlice({
  name: 'User', // Tên của slice phải là một chuỗi
  initialState,
  reducers: {
    // Định nghĩa các reducers ở đây nếu cần
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = 'loading'; // Trạng thái loading khi action pending
        // console.log('Loading...'); // Log khi action đang loading
      })
      .addCase(getUser.fulfilled, (state, action) => {
        // console.log('actionpayload', [...state.postList,...state.payload])
        state.loading = 'idle'; // Trạng thái idle khi action fulfilled
        state.user = action.payload
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = 'idle'; // Trạng thái idle khi action rejected
        state.error = action.error.message;
      });
  },
});

export { getUser }; // Export action creator getData
export default userSlice.reducer; // Export reducer của slice
