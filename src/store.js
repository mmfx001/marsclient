// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './components/Calendar';
import adminReducer from './features/AdminSlice';
import productsReducer from './features/ProductSlice';
import usersReducer from './features/UsersSlice';

const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        admin: adminReducer,
        products: productsReducer,
        users: usersReducer
    },
});

export default store;
