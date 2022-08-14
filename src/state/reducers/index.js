import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from "./AuthReducer";

const reducers = combineReducers({
    auth: AuthReducer,
});

export default reducers;