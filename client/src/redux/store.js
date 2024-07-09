import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { alertsSlice } from "./alert";

const rootReducer = combineReducers({
    alerts: alertsSlice.reducer
});

const store = configureStore({
    reducer: rootReducer,
})

export default store;