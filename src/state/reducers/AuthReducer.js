import { createReducer } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";

const authReducer = createReducer({
    loading: true, 
    user: null, 
    error: null
}, (builder) => { builder
    .addCase('LOGIN', (state, action) => {
        let _user = AuthService.login(action.payload);
        if(_user){
            return {
                ...state,
                loading: false,
                user: _user,
                error: null
            };
        } else {
            return {
                ...state,
                loading: false,
                user: null,
                error: "Cannot Authorize !"
            };
        }
    })
    .addCase('LOGOUT', (state, action) => {
        AuthService.logout();
        return {
            ...state,
            loading: false,
            user: null,
            error: null
        };       
    })
    .addCase('CHECK', (state, action) => {
        let _user = AuthService.check();
        if(_user){
            return {
                ...state,
                loading: false,
                user: _user,
                error: null
            };
        }else {
            return {
                ...state,
                loading: false,
            };            
        }         
    })
});

export default authReducer;