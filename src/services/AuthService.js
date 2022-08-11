import config from "./config";

const AuthService = {
    login: (data) => {
        if(data.username == config.user.username && data.password == config.user.password){
            return true;
        }
        return false;
    },
    logout: () => {

    }
};

export default AuthService;