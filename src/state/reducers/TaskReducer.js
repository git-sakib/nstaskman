import { createReducer } from "@reduxjs/toolkit";

const taskReducer = createReducer([], (builder) => {
    builder.addCase('ADD_TASK', (state, action) => {
        // state.push(action.payload)
    })
    .addCase('EDIT_TASK', (state, action) => {
        // const task = state[action.payload.index]
    })
    .addCase('DELETE_TASK', (state, action) => {
        // const task = state[action.payload.index]
    })
});

export default taskReducer;