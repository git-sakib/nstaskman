import { createReducer } from "@reduxjs/toolkit";

const authReducer = createReducer({}, (builder) => {
    builder.addCase('LOGIN', (state, action) => {
        // "mutate" the array by calling push()
        //state.push(action.payload)
    })
    .addCase('LOGOUT', (state, action) => {
        //const todo = state[action.payload.index]
        // "mutate" the object by overwriting a field
        //todo.completed = !todo.completed
    })
    .addCase('REMOVE_TODO', (state, action) => {
        // Can still return an immutably-updated value if we want to
        //return state.filter((todo, i) => i !== action.payload.index)
    })
});

export default authReducer;