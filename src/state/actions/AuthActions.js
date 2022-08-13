const AuthActions = {
    login: (data) => {
        return (dispatch) => {
            dispatch({type: "LOGIN", payload: data});
        }
    },
    logout: () => {
        return (dispatch) => {
            dispatch({type: "LOGOUT",payload: null});
        }
    },
    check: () => {
        return (dispatch) => {
            dispatch({type: "CHECK",payload: null});
        }
    }        
};

export default AuthActions;