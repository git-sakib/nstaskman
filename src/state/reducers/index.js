import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from "./AuthReducer";
import MemberReducer from "./MemberReducer";
import TaskReducer from "./TaskReducer";

const reducers = combineReducers({
    auth: AuthReducer,
    member: MemberReducer,
    task: TaskReducer,
});

export default reducers;