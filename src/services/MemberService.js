import config from "./config";

const MemberService = {
    list: async () => {
        return fetch(config.apiURL+'members',{
            method: "GET",
            headers: config.apiCallHeaders,
        }).then((response) => response.json()).then((responseData) => {
            return responseData;
        }).catch(error => console.warn(error));
    },

    get: async (id) => {
        return fetch(config.apiURL+'members/'+id,{
            method: "GET",
            headers: config.apiCallHeaders,
        }).then((response) => response.json()).then((responseData) => {
            return responseData;
        }).catch(error => console.warn(error));
    },

    add: async (data) => {
        return fetch(config.apiURL+'members',{
            method: "POST",
            headers: config.apiCallHeaders,
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((responseData) => {
            return responseData;
        }).catch(error => console.warn(error));
    },

    edit: async (data) => {
        return fetch(config.apiURL+'members/'+data.id,{
            method: "PUT",
            headers: config.apiCallHeaders,
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((responseData) => {
            return responseData;
        }).catch(error => console.warn(error));
    },

    remove: async (id) => {
        return fetch(config.apiURL+'members/'+id,{
            method: "DELETE",
            headers: config.apiCallHeaders
        }).then((response) => response.json()).then((responseData) => {
            return responseData;
        }).catch(error => console.warn(error));
    }

};

export default MemberService;