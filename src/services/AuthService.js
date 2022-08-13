import config from "./config";

const AuthService = {
    check: () => {
        const _user = JSON.parse(localStorage.getItem('user'));
        if(_user)return _user;
        return null;
    },
    login: (data) => {
        if(data.username === config.user.username && data.password === config.user.password){
            let _usr = {
                id: config.user.id,
                name: config.user.name,
                username: config.user.username
            };
            localStorage.setItem('user',JSON.stringify(_usr));
            return _usr;
        }
        return null;
    },
    logout: () => {
        localStorage.removeItem('user');
    }
};

export default AuthService;