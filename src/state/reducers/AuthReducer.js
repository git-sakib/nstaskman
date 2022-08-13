import { createReducer } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";

const authReducer = createReducer({user: {
    data: null, error: null
}}, (builder) => { builder
    .addCase('LOGIN', (state, action) => {
        let _user = AuthService.login(action.payload);
        console.log(_user);
        if(_user){
            return {
                ...state,
                user: {
                    data: _user,
                    error: null
                }
            };
        } else {
            return {
                ...state,
                user: {
                    data: null,
                    error: "Cannot Authorize !"
                }
            };
        }
    })
    .addCase('LOGOUT', (state, action) => {
        AuthService.logout();
        return {
            ...state,
            user: {
                data: null,
                error: null
            }
        };       
    })
    .addCase('CHECK', (state, action) => {
        let _user = AuthService.check();
        console.log(_user);
        if(_user){
            return {
                ...state,
                user: {
                    data: _user,
                    error: null
                }
            };
        }         
    })
});

export default authReducer;