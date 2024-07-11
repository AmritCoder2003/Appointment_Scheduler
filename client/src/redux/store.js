import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import { alertsSlice } from "./alert";
import { UserSlice } from "./user";

const rootReducer = combineReducers({
    alerts: alertsSlice.reducer,
    user: UserSlice.reducer
});

const store = configureStore({
    reducer: rootReducer,
})

export default store;