import { configureStore } from '@reduxjs/toolkit';
import homeReducer from "./screens/Home/ home.slice";
import userReducer from './screens/user/user.slice';


export default store =  configureStore({
    reducer:{
        home: homeReducer,
        user: userReducer
    } 
});