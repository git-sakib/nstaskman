import { createReducer } from "@reduxjs/toolkit";

const memberReducer = createReducer([], (builder) => {
    builder.addCase('ADD_MEMBER', (state, action) => {
        // state.push(action.payload)
    })
    .addCase('EDIT_MEMBER', (state, action) => {
        // const member = state[action.payload.index]
    })
    .addCase('DELETE_MEMBER', (state, action) => {
        // const member = state[action.payload.index]
    })
});

export default memberReducer;